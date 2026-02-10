import { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter,
  TextArea,
  Select,
  Checkbox,
  Skeleton,
  Button
} from '../components/ui';

export const ComponentDemo = () => {
  const [textValue, setTextValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);

  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
    { value: 'option4', label: 'Option 4' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">UI Components Demo</h1>
          <p className="text-lg text-gray-600">Showcase of all reusable UI components</p>
        </div>

        {/* Card Components */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Card Components</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default">
              <CardHeader title="Default Card" description="Basic card with default styling" />
              <CardContent>
                <p className="text-gray-600">This is the default card variant with subtle shadow and border.</p>
              </CardContent>
              <CardFooter>
                <Button variant="primary" size="sm">Action</Button>
              </CardFooter>
            </Card>

            <Card variant="outlined">
              <CardHeader title="Outlined Card" description="Card with emphasized border" />
              <CardContent>
                <p className="text-gray-600">This card uses the outlined variant with a stronger border.</p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" size="sm">Action</Button>
              </CardFooter>
            </Card>

            <Card variant="elevated">
              <CardHeader title="Elevated Card" description="Card with prominent shadow" />
              <CardContent>
                <p className="text-gray-600">This card uses the elevated variant with a prominent shadow.</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm">Action</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Form Components */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Form Components</h2>
          
          <Card>
            <CardHeader title="Form Elements" description="All form components with consistent styling" />
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextArea
                  label="Message"
                  placeholder="Enter your message here..."
                  required
                  rows={4}
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                />

                <Select
                  label="Country"
                  options={selectOptions}
                  placeholder="Select a country"
                  value={selectValue}
                  onChange={(e) => setSelectValue(e.target.value)}
                  required
                />
              </div>

              <Checkbox
                label="I agree to the terms and conditions"
                description="By checking this box, you accept our privacy policy and terms of service."
                checked={checkboxValue}
                onChange={(e) => setCheckboxValue(e.target.checked)}
                required
              />

              <div className="flex gap-4">
                <Button variant="primary" loading>Submit</Button>
                <Button variant="secondary">Cancel</Button>
                <Button variant="danger">Delete</Button>
                <Button variant="ghost">Reset</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Skeleton Components */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Skeleton Loading States</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <Skeleton variant="text" lines={3} />
              </CardContent>
            </Card>

            <Skeleton variant="card" height="200px" />

            <Skeleton variant="image" height="150px" />
          </div>
        </section>

        {/* Component Variants */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Component Variants</h2>
          
          <Card>
            <CardHeader title="Button Variants" description="All button styles and states" />
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="sm">Primary Small</Button>
                <Button variant="primary" size="md">Primary Medium</Button>
                <Button variant="primary" size="lg">Primary Large</Button>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" loading>Loading</Button>
                <Button variant="primary" disabled>Disabled</Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};
