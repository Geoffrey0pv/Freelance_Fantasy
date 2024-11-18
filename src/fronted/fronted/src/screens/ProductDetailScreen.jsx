import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from "sonner";  // Importa el toast de Sonner
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { listProductDetails, createProjectOffer } from '../redux/actions/projectActions'; // Import actions

const ProductDetail = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, project } = useSelector((state) => state.projectDetails); // Use Redux state
    const { userInfo } = useSelector((state) => state.userLogin);

    const formMethods = useForm({
        defaultValues: {
            description: '',
            budget_offer: '',
        },
    });

    useEffect(() => {
        dispatch(listProductDetails(projectId)); // Fetch project details via Redux action
    }, [dispatch, projectId]);

    const handleMakeOffer = async (data) => {
        if (!userInfo) {
            navigate('/login');
            return;
        }

        try {
            // Llamar a la acción createProjectOffer para hacer la oferta
            const offerData = {
                description: data.description,
                budget_offer: data.budget_offer,
            };

            await dispatch(createProjectOffer(projectId, offerData));

            // Mostrar toast cuando la oferta se realice correctamente
            toast("Oferta enviada correctamente", {
                description: `Tu oferta de ${data.budget_offer} ha sido enviada.`,
                action: {
                    label: "Deshacer",
                    onClick: () => console.log("Deshacer"),
                },
            });

        } catch (error) {
            console.error("Error al enviar la oferta:", error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-700">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500 font-semibold text-lg">{error}</div>;
    }

    const { title, description, location, date_publication, user, tags, photo, requirements } = project || {};

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
                    <img
                        src={photo || 'https://via.placeholder.com/600x400'}
                        alt={title}
                        className="w-full max-w-4xl rounded-lg object-cover shadow-md mx-auto"
                    />
                </CardTitle>
                <CardDescription>
                    <div className="font-semibold text-gray-700 inline-flex items-center space-x-10">
                        <span>
                            Dueño: <span className="text-gray-500">{user ? `${user.username} ` : 'Unknown'}</span>
                        </span>
                        <span>
                            Publicado en: <span className="text-gray-500">{new Date(date_publication).toLocaleDateString()}</span>
                        </span>
                    </div>
                    <Separator className="border-t border-gray-300 my-2" />
                    <p className="text-sm text-gray-600">{description}</p>
                    <Separator className="border-t border-gray-300 my-2" />
                </CardDescription>
            </CardHeader>

            <CardContent>
                <p className="text-sm text-gray-600">{requirements}</p>
                <Separator className="border-t border-gray-300 my-2"/>
                {/* Render Tags as Badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {tags && tags.length > 0 ? (
                        tags.map((tag) => (
                            <Badge key={tag.id} className="bg-gray-200 text-gray-800">
                                {tag.name}
                            </Badge>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">No tags available.</p>
                    )}
                </div>
            </CardContent>

            <CardFooter className="flex flex-col">
                <span>
                    Localizado en: <span className="text-gray-500">{location}</span>
                </span>
                <Separator className="border-t border-gray-300 my-2" />

                {userInfo && (
                    <div className="mt-4">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button>
                                    Realizar Oferta
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="top">
                                <SheetHeader>
                                    <SheetTitle>Formulario de creación de oferta</SheetTitle>
                                    <SheetDescription>
                                        Llena el siguiente formulario para crear la oferta que le enviaremos al cliente.
                                    </SheetDescription>
                                </SheetHeader>
                                <FormProvider {...formMethods}>
                                    <form onSubmit={formMethods.handleSubmit(handleMakeOffer)} className="space-y-8">
                                        <FormField
                                            control={formMethods.control}
                                            name="description"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Descripción de la oferta</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Describe tu oferta..¿Por qué elegirte a ti?"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={formMethods.control}
                                            name="budget_offer"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Valor de la oferta</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Escriba el valor de la oferta"
                                                            type="number"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit">
                                            Enviar Oferta
                                        </Button>
                                    </form>
                                </FormProvider>
                            </SheetContent>
                        </Sheet>
                    </div>
                )}

                {!userInfo && (
                    <p className="text-sm text-gray-500 mt-4">Inicia sesión para realizar una oferta.</p>
                )}

            </CardFooter>
        </Card>
    );
};

export default ProductDetail;
