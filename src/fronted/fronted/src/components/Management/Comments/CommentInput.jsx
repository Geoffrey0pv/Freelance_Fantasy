import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { postProjectComment, postMilestoneComment, postTaskComment } from '@/redux/actions/projectActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectItem } from '@/components/ui/select';
import ProjectService from '@/service/projectService';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@radix-ui/react-dropdown-menu";

const CommentInput = ({ projectId, activeTab }) => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [commentTag, setCommentTag] = useState('MISC');
    const [milestones, setMilestones] = useState([]);
    const [tasks, setTasks] = useState([]);

    // Fetch milestones and tasks based on projectId
    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                if (projectId) {
                    const milestonesData = await ProjectService.getMilestonesByProjectId(projectId);
                    const tasksData = await ProjectService.getTasksByProjectId(projectId);
                    setMilestones(milestonesData);
                    setTasks(tasksData);
                }
            } catch (error) {
                console.error('Error fetching project data:', error);
            }
        };
        fetchProjectData();
    }, [projectId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        const commentData = { text, tag: commentTag };

        if (activeTab === 'project' && projectId) {
            dispatch(postProjectComment(projectId, commentData));
        } else if (activeTab === 'milestone' && selectedMilestone) {
            dispatch(postMilestoneComment(selectedMilestone, commentData));
        } else if (activeTab === 'task' && selectedTask) {
            dispatch(postTaskComment(selectedTask, commentData));
        }

        setText('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow-md w-full max-w-lg mx-auto">
            {activeTab === 'milestone' && (
                <Select
                    value={selectedMilestone}
                    onValueChange={(value) => setSelectedMilestone(value)}
                    placeholder="Select Milestone"
                    className="w-full"
                >
                    {milestones.map((milestone) => (
                        <SelectItem key={milestone.id} value={milestone.id}>
                            {milestone.title}
                        </SelectItem>
                    ))}
                </Select>
            )}

            {activeTab === 'task' && (
                <Select
                    value={selectedTask}
                    onValueChange={(value) => setSelectedTask(value)}
                    placeholder="Select Task"
                    className="w-full"
                >
                    {tasks.map((task) => (
                        <SelectItem key={task.id} value={task.id}>
                            {task.title}
                        </SelectItem>
                    ))}
                </Select>
            )}

            <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a comment..."
                className="w-full"
            />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="bg-gray-200 text-gray-800 hover:bg-gray-300">
                        Tag: {commentTag}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 p-2 bg-white border border-gray-200 shadow-lg rounded-md">
                    {["FIX", "TO-DO", "MISC"].map((tag) => (
                        <DropdownMenuItem
                            key={tag}
                            onSelect={() => setCommentTag(tag)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {tag}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <Button
                type="submit"
                className="bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full"
            >
                Submit
            </Button>
        </form>
    );
};

export default CommentInput;