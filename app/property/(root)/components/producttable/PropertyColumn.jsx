"use client";

import { Button } from "@/components/ui/button";
import  DataTableColumnHeader  from "@/components/ui/data-table-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteUserDialog from "@/components/DeleteUserDialog"

import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";

const PropertyColumns = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <div className="flex justify-start items-center w-full text-left">
          <DataTableColumnHeader column={column} title="Name" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-left">{row.original.title}</div>;
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <div className="flex justify-start items-center w-full text-left">
        <DataTableColumnHeader column={column} title="Category" />
      </div>
    ),
    cell: ({ row }) => {
      return <div className="text-left">{row.original.type}</div>;
    },
  },
  {
    accessorKey: "rent",
    header: ({ column }) => {
      return (
        <div className="flex justify-start items-center w-full text-left">
          <DataTableColumnHeader column={column} title="Rent" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-left">{row.original.rent}</div>;
    },
  },
  {
    accessorKey: "bedrooms",
    header: ({ column }) => {
      return (
        <div className="flex justify-start items-center w-full text-left">
          <DataTableColumnHeader column={column} title="Total Bedrooms" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-left">{row.original.bedrooms}</div>;
    },
  },
  {
    id: "actions",
    header: () => (
      <div className="text-center">
        <span className="sr-only">Actions</span>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link
                href={`/propertyDisplay/${row.original._id}`}
                className="flex items-center justify-start gap-2 w-full"
              >
                <Eye className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  View
                </span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={`/property/${row.original._id}`}
                className="flex items-center justify-start gap-2 w-full"
              >
                <Edit className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Edit
                </span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuLabel className="m-0 p-0 font-normal">
              <Trash2 className="h-3.5 w-3.5"/>
              {row.original._id && (
                <DeleteUserDialog userID={row.original._id} />
              )} 
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default PropertyColumns;
