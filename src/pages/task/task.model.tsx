export interface ITask {
    id: number;
    isSelected: boolean;
    assignedEmployee: any;
    description: string;
    status: string;
    createdAt: string;
}