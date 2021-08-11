import { Table, Button } from 'react-bootstrap';
import Moment from 'react-moment';
import { ITask } from './task.model';

interface ITasks {
    tasks: ITask[];
    handleShow: any;
    handleDeleteShow: any;
}

export const TaskList: React.FC<ITasks> = ({tasks, handleShow, handleDeleteShow}) => {
    const handleCheck = (index: number) => {
        tasks[index].isSelected = !tasks[index].isSelected;
    }

    return(
        <Table striped hover>
            <thead className="bg-dark text-white">
                <tr>
                    <th></th>
                    <th>ID.</th>
                    <th>Task Description</th>
                    <th>Responsible</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task, index) =>
                    <tr key={index}>
                        <td><input type="checkbox" onChange={() => handleCheck(index)}/></td>
                        <td>{task.id}</td>
                        <td>{task.description}</td>
                        <td>{task.assignedEmployee?.name}</td>
                        <td>{task.status}</td>
                        <td><Moment format="MM/DD/YYYY">{task.createdAt}</Moment></td>
                        <td>
                            <Button className="mx-1" onClick={() => handleShow(false, task.id)}>Edit</Button>
                            <Button className="btn-danger mx-1" onClick={() => handleDeleteShow(false, task.id)}>Delete</Button>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}