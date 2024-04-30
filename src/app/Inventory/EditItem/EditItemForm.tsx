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
import { ItemEditForm } from './add-item-form';

// uses a card component 
function EditItemForm() {
  return (
    <Card className="h-full overflow-auto">
        <CardContent className="grid gap-6 pt-6">
          <div className="flex flex-col space-y-2 ">
            <ItemEditForm />
          </div>
        </CardContent>
    </Card>
  );
}

export default EditItemForm;