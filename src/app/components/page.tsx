"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Loading } from '@/components/ui/Loading';
import { Modal, ConfirmModal } from '@/components/ui/Modal';

export default function ComponentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-12 text-center">UI Component Library</h1>
      
      {/* Buttons Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Buttons</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Button Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="ghost">Ghost Button</Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Button Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="sm">Small Button</Button>
              <Button variant="primary" size="md">Medium Button</Button>
              <Button variant="primary" size="lg">Large Button</Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Button States</h3>
            <div className="flex flex-wrap gap-4">

              <Button variant="primary" isLoading>Loading Button</Button>
              <Button 
                variant="primary"
                leftIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                }
              >
                Icon Button
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Cards Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>This is a standard card component</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card has a clean design with subtle shadows and hover effects.</p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" size="sm">Learn More</Button>
            </CardFooter>
          </Card>
          
          <Card variant="glass" isInteractive={true} className="frosted-glass">
            <CardHeader>
              <CardTitle>Glass Card</CardTitle>
              <CardDescription>With frosted glass effect</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card has a glass morphism effect with a subtle purple glow on hover.</p>
            </CardContent>
            <CardFooter>
              <Button variant="primary" size="sm">Learn More</Button>
            </CardFooter>
          </Card>
          
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Bordered Card</CardTitle>
              <CardDescription>Simple bordered style</CardDescription>
            </CardHeader>
            <CardContent>
              <p>A minimal card with a border and transparent background.</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm">Learn More</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      
      {/* Loading Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Loading Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
            <h3 className="text-lg font-medium mb-4">Spinner</h3>
            <Loading variant="spinner" size="md" />
          </div>
          
          <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
            <h3 className="text-lg font-medium mb-4">Dots</h3>
            <Loading variant="dots" size="md" />
          </div>
          
          <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
            <h3 className="text-lg font-medium mb-4">Pulse</h3>
            <Loading variant="pulse" size="md" />
          </div>
        </div>
      </section>
      
      {/* Modals Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Modals</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Open Modal
          </Button>
          
          <Button variant="secondary" onClick={() => setIsConfirmModalOpen(true)}>
            Open Confirm Modal
          </Button>
        </div>
        
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Example Modal"
          description="This is a standard modal with a blurred backdrop"
        >
          <div className="py-4">
            <p>This modal has a smooth open/close animation and a backdrop blur effect.</p>
            <p className="mt-4">Click outside or the X button to close.</p>
          </div>
          <div className="flex justify-end mt-6">
            <Button onClick={() => setIsModalOpen(false)}>Close Modal</Button>
          </div>
        </Modal>
        
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={() => console.log("Confirmed action!")}
          title="Confirm Action"
          message="Are you sure you want to perform this action? This cannot be undone."
          variant="warning"
        />
      </section>
    </div>
  );
}
