import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// Definir el esquema de validación con Zod
const FormSchema = z.object({
    filterByTag: z.boolean().optional(),
    tag: z.string().optional(),
    filterByType: z.boolean().optional(),
    type: z.string().optional(),
}).refine(
    (data) => data.filterByTag || data.filterByType, // Validar que al menos uno esté seleccionado
    {
        message: "Debes seleccionar al menos un filtro.",
    }
);

export function FilterProjectsForm() {
    // Estado para controlar si mostrar los inputs de tag y tipo
    const [showTagInput, setShowTagInput] = useState(false);
    const [showTypeInput, setShowTypeInput] = useState(false);

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            filterByTag: false,
            tag: "",
            filterByType: false,
            type: "",
        },
    });

    function onSubmit(data) {
        console.log("Filtros aplicados:", data);
        // Lógica para enviar la solicitud filtrada a la API o Redux
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Filtrar Proyectos</Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-72">
                        <DropdownMenuItem>
                            <FormField
                                control={form.control}
                                name="filterByTag"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-3">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={(checked) => {
                                                    field.onChange(checked);
                                                    setShowTagInput(checked); // Mostrar input si está marcado
                                                }}
                                            />
                                        </FormControl>
                                        <FormLabel>Filtrar por Tag</FormLabel>
                                    </FormItem>
                                )}
                            />
                            {showTagInput && (
                                <FormField
                                    control={form.control}
                                    name="tag"
                                    render={({ field }) => (
                                        <FormItem className="mt-4">
                                            <FormLabel>Tag</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Escribe el tag" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <FormField
                                control={form.control}
                                name="filterByType"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-3">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={(checked) => {
                                                    field.onChange(checked);
                                                    setShowTypeInput(checked); // Mostrar input si está marcado
                                                }}
                                            />
                                        </FormControl>
                                        <FormLabel>Filtrar por Tipo de Proyecto</FormLabel>
                                    </FormItem>
                                )}
                            />
                            {showTypeInput && (
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem className="mt-4">
                                            <FormLabel>Tipo de Proyecto</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Escribe el tipo de proyecto" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button type="submit">Aplicar Filtros</Button>
            </form>
        </Form>
    );
}
