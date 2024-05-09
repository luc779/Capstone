import React from 'react';
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { InventoryAddForm } from './add-item-form';

// uses a card component 
function AddItemForm() {
  return (
    <Card className="h-full overflow-auto">
        <CardContent className="grid gap-6 pt-6">
          <div className="flex flex-col space-y-2 ">
            <InventoryAddForm />
          </div>
        </CardContent>
    </Card>
  );
}

export default AddItemForm;