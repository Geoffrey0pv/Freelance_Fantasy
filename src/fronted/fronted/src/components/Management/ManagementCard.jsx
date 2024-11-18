import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
const getBadgeColor = (status) => {
    switch (status) {
        case 'active':
            return 'bg-green-500 text-white'; // Fondo verde y texto blanco
        case 'finished':
            return 'bg-red-500 text-white'; // Fondo rojo y texto blanco
        case 'pending':
            return 'bg-yellow-500 text-black'; // Fondo amarillo y texto negro
        default:
            return 'bg-gray-500 text-white'; // Color por defecto para otros estados
    }
};
export const card = ({ title, status,bannerUrl,button_text,onclick}) => {
  return  (
        <Card className="max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden">
            <div className="h-48 overflow-hidden">
                <img
                    src={bannerUrl}
                    alt={title}
                    className="object-cover w-full h-full"
                />
            </div>
            <CardHeader className="p-4">
                <CardTitle className="text-xl font-bold">{title}</CardTitle>
                <CardDescription className="mt-2">
                    <Badge className={`${getBadgeColor(status)} px-2 py-1 rounded`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
                <Button className="w-full" onClick={onclick}
                >{button_text}</Button>
            </CardContent>
            <CardFooter className="p-4">
                <p className="text-sm text-gray-500">Card Footer</p>
            </CardFooter>
        </Card>
    );
};
export default card;