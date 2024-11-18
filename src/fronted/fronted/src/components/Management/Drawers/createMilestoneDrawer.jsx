import React, { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createMilestone } from "@/redux/actions/ultimateMilestoneActions.js";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";

const CreateMilestoneDrawer = ({ projectId }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        const milestoneData = {
            ...data,
            start_date: new Date(data.start_date).toISOString(),
            end_date: new Date(data.end_date).toISOString(),
        };
        dispatch(createMilestone(projectId, milestoneData));
        setOpen(false);
        reset();
    };

    return (
        <>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button className="bg-black-100 text-white rounded-lg px-4 py-2 hover:bg-gray-800 transition">
                        Crear Milestone
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="p-6 max-w-lg mx-auto">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">Nuevo Milestone</h3>
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
                                    {...register("end_date", { required: "La fecha de finalización es obligatoria" })}
                                    type="date"
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                />
                                {errors.end_date && <p className="text-red-500">{errors.end_date.message}</p>}
                            </div>
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

export default CreateMilestoneDrawer;