// dummy data for table
export const mockData = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        age: 25,
        gender: 'male',
        status: 'active',
        date: '2022-01-01',
        isChecked: true,
    },
    {
        id: 2,
        name: 'Jane Doe',
        email: 'jane@example.com',
        age: 30,
        gender: 'female',
        status: 'active',
        date: '2022-02-01',
        isChecked: false,
    },
    // Add more mock data as needed
];
// initial form state
export const initialFormData = {
    name: '',
    email: '',
    age: '',
    gender: 'male',
    isChecked: false,
    date: '',
    status: ''
};
// initial form error state
export const initialErrors = {
    name: '',
    email: '',
    age: '',
    date: '',
    gender: '',
    status: ''
};