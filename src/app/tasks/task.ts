export interface Task {
    /** Unique identifier */
    id: unknown;

    title: string;

    /** Status
     * 
     * If not set it means the task is pending
     */
    status?: 'in-progress' | 'done'
}
