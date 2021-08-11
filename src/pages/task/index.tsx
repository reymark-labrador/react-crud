import { useEffect, useState } from 'react';
import { Button, Table, Modal, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Layout } from '../../components';
import { ITask } from './task.model';
import { TaskList } from './taskList';
import { TaskForm } from './taskForm';

export const Task: React.FC = () => {
    const api: any = process.env.REACT_APP_BASE_API;
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [isMultipleDelete, setMultipleDelete] = useState(false);
    const [isNewEmployee, setIsNewEmployee] = useState<boolean>();
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [selectedEmployees, setSelectedEmployees] = useState<any>([]);
    const [selectedTask, setSelectedTask] = useState<any>(0);
    
    const handleClose = () => setShow(false);
    const handleDeleteClose = () => setShowDelete(false);
    
    const handleShow = (isNew: boolean, _selectedTask?: number) => {
        setShow(true);
        setIsNewEmployee(isNew);
        setSelectedTask(_selectedTask);
    }
    
    const handleGetTaskList = () => {
        fetch(api + '/employeetask', {method: "get"})
            .then(res => res.json())
            .then(result => setTasks(result));
    }

    const handleDeleteShow = (isMultiple: boolean, _selectedTask?: number) => {
        setShowDelete(true);
        setMultipleDelete(isMultiple);
        setSelectedTask(_selectedTask);
    }

    const handeDelete = () => {
        isMultipleDelete ? handleDeleteMultipleTask() : handleDeleteTask();
    }

    const handleDeleteTask = () => {
        fetch(api + '/employeetask', {method: "delete", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify([selectedTask])})
            .then(res => res.json())
            .then(() => selectedTask(0));
    }

    const handleDeleteMultipleTask = () => {
        tasks.forEach((e, index) => {
            if (e.isSelected) {
                selectedEmployees.push(e.id);
                delete tasks[index];
            }
        });

        fetch(api + '/employeetask', {method: "delete", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(selectedEmployees)})
            .then(res => res.json())
            .then(() => setSelectedEmployees([]));
    }

    useEffect(() => {
        handleGetTaskList();
    }, []);

    return (
        <Layout>
            <Row className="text-end">
                <Link to="/employee">Employee List</Link>
            </Row>
            <h1>Task Management System</h1>
            <h5 className="text-secondary">Assign Task to Employees</h5>
            <Row className="mt-2 mb-5">
                <Col className="d-flex justify-content-end">
                    <Button variant="danger" className="mx-2" onClick={() => handleDeleteShow(true)}>
                        Delete Selected
                    </Button>
                    <Button variant="success" onClick={() => handleShow(true)}>
                        Create Task
                    </Button>
                </Col>
            </Row>
            <TaskList tasks={tasks} handleShow={handleShow} handleDeleteShow={handleDeleteShow}/>
            <TaskForm isNew={isNewEmployee} show={show} handleClose={handleClose} handleGetTaskList={handleGetTaskList} taskID={selectedTask}/>
            
            <Modal show={showDelete} onHide={handleDeleteClose} animation={false}>
                <form onSubmit={handeDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {isMultipleDelete ? "Are you sure you want to Delete Records ?" : "Are you sure you want to Delete ?"}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" type="submit">
                            Delete
                        </Button>
                        <Button variant="primary"onClick={handleDeleteClose} >
                            Cancel
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </Layout>
    );
};