import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "@/redux/actions/taskActions.js";
import { listMilestones } from "@/redux/actions/ultimateMilestoneActions.js";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";

const CreateTaskDrawer = ({ projectId }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const { milestones } = useSelector((state) => state.milestoneList);

    useEffect(() => {
        if (open) {
            dispatch(listMilestones(projectId));
        }
    }, [dispatch, projectId, open]);

    const onSubmit = (data) => {
        dispatch(createTask(data.milestone_id, data));
        setOpen(false);
        reset();
    };

    return (
        <>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button className="bg-black-100 text-white rounded-lg px-4 py-2 hover:bg-gray-800 transition">
                        Crear Task
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="p-6 max-w-lg mx-auto">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">Nueva Task</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Input
                                {...register("title", { required: "El título es obligatorio" })}
                                placeholder="Título"
                                className="w-full border border-gray-300 rounded-lg p-2"
                            />
                            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Textarea
                                {...register("description", { required: "La descripción es obligatoria" })}
                                placeholder="Descripción"
                                className="w-full border border-gray-300 rounded-lg p-2"
                            />
                            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Input
                                    {...register("start_date", { required: "La fecha de inicio es obligatoria" })}
                                    type="date"
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                />
                                {errors.start_date && <p className="text-red-500">{errors.start_date.message}</p>}
                            </div>
                            <div>
                                <Input
                                    {...register("finish_date", { required: "La fecha de finalización es obligatoria" })}
                                    type="date"
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                />
                                {errors.finish_date && <p className="text-red-500">{errors.finish_date.message}</p>}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <select
                                {...register("milestone_id", { required: "Selecciona un milestone" })}
                                className="w-full border border-gray-300 rounded-lg p-2"
                            >
                                <option value="">Selecciona un Milestone</option>
                                {milestones?.map((milestone) => (
                                    <option key={milestone.id} value={milestone.id}>
                                        {milestone.title}
                                    </option>
                                ))}
                            </select>
                            {errors.milestone_id && <p className="text-red-500">{errors.milestone_id.message}</p>}
                        </div>
                        {/* Selector de Prioridad */}
                        <div className="space-y-2">
                            <select
                                {...register("priority", { required: "Selecciona una prioridad" })}
                                className="w-full border border-gray-300 rounded-lg p-2"
                            >
                                <option value="">Selecciona una Prioridad</option>
                                <option value="baja">Baja</option>
                                <option value="media">Media</option>
                                <option value="alta">Alta</option>
                            </select>
                            {errors.priority && <p className="text-red-500">{errors.priority.message}</p>}
                        </div>
                        <Button type="submit" className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition">
                            Guardar
                        </Button>
                    </form>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default CreateTaskDrawer;