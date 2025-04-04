"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/app/components/ui/dialog";
import { ProductForm } from "@/app/components/product-form";

interface AddProductButtonProps {
	refreshProducts: () => void;
}

export function AddProductButton({ refreshProducts }: AddProductButtonProps) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus className='mr-2 h-4 w-4' />
					Add Product
				</Button>
			</DialogTrigger>
			<DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-[600px]'>
				<DialogHeader>
					<DialogTitle>Add New Product</DialogTitle>
					<DialogDescription>
						Add a new product to your inventory. Fill in all the required
						fields.
					</DialogDescription>
				</DialogHeader>
				{/* Pass refreshProducts to ProductForm */}
				<ProductForm
					onSuccess={() => {
						setOpen(false); // Close dialog
						refreshProducts(); // Refresh the product list
					}}
				/>
			</DialogContent>
		</Dialog>
	);
}
