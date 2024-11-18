import React from 'react';
import { useState } from 'react';
import { Button } from '../components/ui/button.jsx'; // Asegúrate de que 'Button' esté bien importado
import { Tooltip, TooltipTrigger, TooltipContent ,TooltipProvider} from '../components/ui/tooltip';
import { MailIcon, InboxIcon, ArchiveIcon } from 'lucide-react';

export default function Dashboard() {
    const [selectedEmail, setSelectedEmail] = useState(null);

    // Ejemplo de correos para la lista
    const emails = [
        { id: 1, sender: 'William Smith', subject: 'Meeting Tomorrow', tags: ['meeting', 'work', 'important'], body: 'Hi, let\'s have a meeting tomorrow...', time: '9:00 AM' },
        { id: 2, sender: 'Alice Smith', subject: 'Re: Project Update', tags: ['work', 'important'], body: 'Thank you for the project update...', time: 'about 1 year ago' },
        { id: 3, sender: 'Bob Johnson', subject: 'Weekend Plans', tags: ['personal'], body: 'Any plans for the weekend?...', time: 'over 1 year ago' },
    ];

    return (
        <TooltipProvider>
            <div className="flex h-screen">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-800 text-white flex flex-col">
                    <div className="p-4 text-lg font-semibold border-b border-gray-700">
                        Mail Dashboard
                    </div>
                    <nav className="flex-1 p-4">
                        <Button variant="ghost" className="w-full flex items-center justify-start">
                            <InboxIcon className="w-5 h-5 mr-2" />
                            Inbox
                            <span className="ml-auto bg-gray-600 text-sm px-2 py-0.5 rounded-full">128</span>
                        </Button>
                        <Button variant="ghost" className="w-full flex items-center justify-start">
                            <ArchiveIcon className="w-5 h-5 mr-2" />
                            Archive
                            <span className="ml-auto bg-gray-600 text-sm px-2 py-0.5 rounded-full">23</span>
                        </Button>
                    </nav>
                </aside>

                {/* Email List */}
                <div className="w-96 bg-gray-100 border-r border-gray-300 overflow-y-auto">
                    <div className="p-4 text-lg font-semibold border-b">
                        Emails
                    </div>
                    <div className="p-4 space-y-4">
                        {emails.map((email) => (
                            <div
                                key={email.id}
                                onClick={() => setSelectedEmail(email)}
                                className="p-4 bg-white rounded-lg shadow hover:bg-gray-200 cursor-pointer"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold">{email.sender}</h3>
                                    <span className="text-sm text-gray-500">{email.time}</span>
                                </div>
                                <p className="text-gray-700">{email.subject}</p>
                                <div className="flex gap-2 mt-2">
                                    {email.tags.map((tag, index) => (
                                        <Tooltip key={index} delayDuration={0}>
                                            <TooltipTrigger asChild>
                                                <span className="bg-gray-300 text-xs px-2 py-0.5 rounded">{tag}</span>
                                            </TooltipTrigger>
                                            <TooltipContent>{tag}</TooltipContent>
                                        </Tooltip>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Email Details */}
                <div className="flex-1 bg-white p-4">
                    {selectedEmail ? (
                        <div>
                            <h2 className="text-xl font-semibold">{selectedEmail.subject}</h2>
                            <p className="text-sm text-gray-500">
                                {selectedEmail.sender} - {selectedEmail.time}
                            </p>
                            <div className="mt-4">
                                <p className="text-gray-800">{selectedEmail.body}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-500 text-center mt-10">
                            Select an email to see the details.
                        </div>
                    )}
                </div>
            </div>
        </TooltipProvider>
    );
}
