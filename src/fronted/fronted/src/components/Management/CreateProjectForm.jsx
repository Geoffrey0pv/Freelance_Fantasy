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
    requirements: z.string().min(3, "Los requisitos son obligatorios"), // Validación añadida para requisitos
    location: z.string().min(3, "La ubicación es obligatoria"),
    budget: z.preprocess((value) => parseFloat(value), z.number().positive("El presupuesto debe ser un número positivo")),
    photo: z.instanceof(File, "Debe seleccionar una imagen válida"),
    tags: z.string().optional(),
});

export function CreateProjectForm() {
    const dispatch = useDispatch();
    const [selectedFileName, setSelectedFileName] = useState("");
    const [notification, setNotification] = useState(""); // Notificación global para el formulario
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(FormSchema),
        mode: "onSubmit", // Validación solo al enviar
    });

    const onSubmit = (data) => {
        if (Object.keys(errors).length > 0) {
            setNotification("Por favor, completa todos los campos obligatorios antes de enviar.");
            return;
        }

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("requirements", data.requirements);
        formData.append("location", data.location);
        formData.append("budget", data.budget.toFixed(2));
        formData.append("photo", data.photo);

        if (data.tags) {
            formData.append("tags", data.tags);
        }

        console.log("FormData entries:", Object.fromEntries(formData.entries()));

        try {
            dispatch(createProject(formData));
            setNotification("¡Proyecto creado con éxito!");
        } catch (error) {
            setNotification("Error al crear el proyecto. Inténtalo de nuevo.");
            console.error("Error al enviar el formulario:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input {...register("title")} placeholder="Título del Proyecto" />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}

            <Textarea {...register("description")} placeholder="Descripción del Proyecto" />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}

            <Textarea {...register("requirements")} placeholder="Requisitos del Proyecto" />
            {errors.requirements && <p className="text-red-500">{errors.requirements.message}</p>}

            <Input {...register("location")} placeholder="Ubicación" />
            {errors.location && <p className="text-red-500">{errors.location.message}</p>}

            <Input {...register("budget")} type="number" placeholder="Presupuesto" step="0.01" />
            {errors.budget && <p className="text-red-500">{errors.budget.message}</p>}

            <Input {...register("tags")} placeholder="Tags (separados por comas)" />

            <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files[0]; // Obtener el primer archivo seleccionado
                    setSelectedFileName(file ? file.name : ""); // Mostrar el nombre del archivo
                    setValue("photo", file); // Almacena el objeto File directamente en el estado del formulario
                }}
            />
            {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}
            {selectedFileName && <p>Archivo seleccionado: {selectedFileName}</p>}

            <Button type="submit" disabled={isSubmitting}>Crear Proyecto</Button>

            {/* Mostrar mensajes de notificación global */}
            {notification && (
                <p className={`mt-4 text-center ${errors.length > 0 ? "text-red-500" : "text-green-500"}`}>
                    {notification}
                </p>
            )}
        </form>
    );
}
