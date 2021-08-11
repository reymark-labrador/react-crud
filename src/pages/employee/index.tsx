import { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Layout } from '../../components';
import { IEmployee } from '../../model/employee.model';

export const Employee: React.FC = () => {
    const api: any = process.env.REACT_APP_BASE_API;
    const [employees, setEmployees] = useState<IEmployee[]>([]);

    const handleGetTaskList = () => {
        fetch(api + '/employee', {method: "get"})
            .then(res => res.json())
            .then(result => setEmployees(result));
    }
    
    useEffect(() => {
        handleGetTaskList();
    }, []);

    return (
        <Layout>
            <Row>
                <Link to="/task-list">Back to Task List</Link>
            </Row>
            <h1>Task Management System</h1>
            <h5 className="text-secondary">Employees Available</h5>
            <Table striped hover className="mt-5">
                <thead className="bg-dark text-white">
                    <tr>
                        <th>ID.</th>
                        <th>Employee Name</th>
                        <th>Designation</th>
                        <th>Department</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) =>
                        <tr key={index}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.designation}</td>
                            <td>{employee.department}</td>
                            <td><Moment format="MM/DD/YYYY">{employee.createdAt}</Moment></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Layout>
    );
};