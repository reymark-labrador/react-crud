import { Switch, Route, Redirect } from "react-router-dom";
import { NotFound } from '../pages/notFound';
import { Employee } from '../pages/employee';
import { Task } from '../pages/task';

export const Routes: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/task-list"/>
            </Route>
            <Route exact path="/task-list" component={Task}/>
            <Route exact path="/employee" component={Employee}/>
            <Route component={NotFound} />
        </Switch>
    );
};