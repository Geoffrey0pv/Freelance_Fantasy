import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Para mostrar los tags
import { Separator } from "@/components/ui/separator";

// eslint-disable-next-line react/prop-types
const ProjectCard = ({ title, description = '', bannerUrl, tags = [], onMoreInfoClick }) => {
    const baseUrl = "https://freelancefantasy-backend-dfbte3d4f0csd5bc.westus-01.azurewebsites.net"; // Define la base URL
    
    return (
        <Card className="bg-white text-black-100 shadow-md hover:shadow-lg transition-shadow">
            {/* Imagen del proyecto */}
            <CardHeader>
                <div className="w-full h-48 overflow-hidden rounded-md">
                    <img src={`${baseUrl}${bannerUrl}`} alt={title} className="object-cover w-full h-full" />
                </div>
                <CardTitle className="mt-4 text-center text-lg">{title}</CardTitle>
            </CardHeader>

            <CardContent>
                <Separator className="my-4 border-gray-600" />
                {/* Descripción corta truncada */}
                <CardDescription className="text-black-100 text-sm text-center overflow-hidden text-ellipsis whitespace-nowrap">
                    {description}
                </CardDescription>

                <Separator className="my-4 border-gray-600" />
                {/* Mostrar los tags */}
                <div className="flex flex-wrap gap-2 justify-center">
                    {tags.length > 0 ? (
                        tags.map((tag) => (
                            <Badge key={tag.id} className="bg-gray-700 text-white">{tag.name}</Badge>
                        ))
                    ) : (
                        <span className="text-sm text-gray-500">No tags available</span>
                    )}
                </div>
            </CardContent>

            <CardFooter className="flex justify-center">
                {/* Botón de más información */}
                <Button onClick={onMoreInfoClick} className="mt-4">
                    Ver más
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProjectCard;
