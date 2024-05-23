import React from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from 'next/link';
import { ItemEditForm } from './edit-item-form';

// uses a card component 
function EditItemForm() {
  return (
    <Card className="h-full overflow-auto">
        <CardContent className="grid gap-6 pt-6  h-full">
          <div className="flex flex-col space-y-2 items-center justify-center h-full">
            <ItemEditForm />
          </div>
        </CardContent>
    </Card>
  );
}

export default EditItemForm;