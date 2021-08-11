import { useEffect, useState } from 'react';
import { Button, Modal, Form, ToastContainer , Toast} from 'react-bootstrap';
import { IEmployee } from '../../model/employee.model';

interface ITaskForm {
    show: any;
    handleClose: any;
    handleGetTaskList: any;
    isNew?: boolean;
    taskID: number;
}

export const TaskForm: React.FC<ITaskForm> = ({show, handleClose, handleGetTaskList, isNew, taskID}) => {
    const api: any = process.env.REACT_APP_BASE_API;
    const title = isNew ? "Create a Task" : "Edit Task";
    const [showToast, setShowToast] = useState(false);
    const [employees, setEmployees] = useState<IEmployee[]>([]);
    const taskSchema= {
        id: 0,
        assignedEmployeeID: 0,
        description: '',
        status: 'Pending'
    }
    const [field, setField] = useState(taskSchema);

    const init = () => {
        setField(taskSchema);
    }

    const toggleShowToast = () => setShowToast(!showToast);
    const handleGetEmployees = () => {
        fetch(api + '/employee')
            .then(res => res.json())
            .then(result => setEmployees(result));
    }

    const handleGetTask = () => {
        if(taskID == undefined || taskID == 0 || isNew) return;

        fetch(api + '/employeetask/' + taskID)
            .then(res => res.json())
            .then(result => setField(result));
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();

        if(isNew) {
            fetch(api + '/employeetask', {
                method: "post", 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(field)})
                    .then(res => res.json())
                    .then(() => {
                        toggleShowToast();
                        handleClose();
                        handleGetTaskList();
                        init();
                    });
            
        } else {
            fetch(api + '/employeetask/' + taskID, {
                method: "put", 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(field)})
                    .then(res => res.json())
                    .then(() => {
                        toggleShowToast();
                        handleClose();
                        handleGetTaskList();
                    });
        }
        
    }

    const formStatus = () => {
        if(isNew) return;
        return <>
            <Form.Label>Satus</Form.Label>
            <select required className="form-select" placeholder="Enter Task Name" value={field.status} onChange={e => setField({...field, status: e.target.value})}>
                {isNew ? <option value="">Select A Status</option> : ''}
                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
            </select>
        </>
    }

    const formAssiendEmployee = () => {
        return <>
            <Form.Label>Assign To</Form.Label>
            <select required className="form-select" placeholder="Enter Task Name" value={field.assignedEmployeeID} onChange={e => setField({...field, assignedEmployeeID: parseInt(e.target.value)})}>
                {isNew ? <option value="">Select An Employee</option> : ''}
                {employees.map((item, index) => 
                    <option key={index} value={item.id}>{item.name}</option>
                )}
            </select>
        </>
    }

    useEffect(() => {
        init();
        setShowToast(false);
        handleGetEmployees();
        handleGetTask();
    }, [taskID, isNew]);

    return(
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control 
                                required 
                                type="input" 
                                placeholder="Enter Task Name" 
                                value={field.description} 
                                onChange={e => setField({...field, description: e.target.value})}/>
                            {formStatus()}
                            {formAssiendEmployee()}
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <ToastContainer position="top-end">
                <Toast show={showToast} onClose={toggleShowToast} className="bg-success">
                    <Toast.Header className="bg-success">
                        <strong className="me-auto text-white">{isNew ? "Task Created" : "Task Updated" }</strong>
                    </Toast.Header>
                </Toast>
            </ToastContainer>
            
        </>
    );
}