import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createProject } from "../../redux/actions/projectActions";

const FormSchema = z.object({
    title: z.string().min(3, "El título es obligatorio"),
    description: z.string().min(10, "La descripción es obligatoria"),
    requirements: z.string(),
    location: z.string().min(3, "La ubicación es obligatoria"),
    type_project: z.string().min(3, "El tipo de proyecto es obligatorio"),
    budget: z.preprocess((value) => parseFloat(value), z.number().positive("El presupuesto debe ser un número positivo")),
    photo: z.any(),
    tags: z.string().optional(),
});

export function CreateProjectForm() {
    const dispatch = useDispatch();
    const [selectedFileName, setSelectedFileName] = useState("");
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(FormSchema),
    });

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("requirements", data.requirements);
        formData.append("location", data.location);
        formData.append("type_project", data.type_project);

        // Convert the budget to a float and append it
        const parsedBudget = parseFloat(data.budget);
        if (!isNaN(parsedBudget)) {
            formData.append("budget", parsedBudget.toFixed(2));
        }

        // Check if photo is a valid File object before appending
        if (data.photo instanceof File) {
            formData.append("photo", data.photo);
        } else {
            console.error("No valid file selected for photo.");
        }

        if (data.tags) {
            formData.append("tags", data.tags);
        }

        console.log("FormData entries:", Object.fromEntries(formData.entries()));
        dispatch(createProject(formData));
    };




    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input {...register("title")} placeholder="Título del Proyecto" />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}

            <Textarea {...register("description")} placeholder="Descripción del Proyecto" />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}

            <Textarea {...register("requirements")} placeholder="Requisitos del Proyecto" />

            <Input {...register("location")} placeholder="Ubicación" />
            {errors.location && <p className="text-red-500">{errors.location.message}</p>}

            <Input {...register("type_project")} placeholder="Tipo de Proyecto" />
            {errors.type_project && <p className="text-red-500">{errors.type_project.message}</p>}

            <Input {...register("budget")} type="number" placeholder="Presupuesto" step="0.01" />
            {errors.budget && <p className="text-red-500">{errors.budget.message}</p>}

            <Input {...register("tags")} placeholder="Tags (separados por comas)" />

            <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files[0]; // Get the first file from the input
                    console.log("Archivo seleccionado:", file); // Log the selected file
                    setSelectedFileName(file ? file.name : ""); // Display the file name
                    setValue("photo", file); // Store the File object directly in the form state
                }}
            />
            {selectedFileName && <p>Archivo seleccionado: {selectedFileName}</p>}

            <Button type="submit">Crear Proyecto</Button>
        </form>
    );
}
