# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

addd scholarship form : 
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const CreateScholarship = () => {
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const data = Object.fromEntries(formData.entries());

//     try {
//       const response = await axios.post('/api/scholarships', data);
//       console.log('Scholarship created:', response.data);
//       alert('Scholarship successfully created!');
//       e.target.reset();  // Clear form
//     } catch (error) {
//       console.error('Error creating scholarship:', error);
//       alert('Failed to create scholarship');
//     }
//   };

//   return (
//     <div>
//       <h1>Create Scholarship</h1>
//       <form onSubmit={handleSubmit}>
//         <div><label>Title:</label><input type="text" name="title" required /></div>
//         <div><label>Organization:</label><input type="text" name="organization" required /></div>
//         <div><label>Description:</label><textarea name="description" required></textarea></div>
//         <div><label>Eligibility:</label><input type="text" name="eligibility" required /></div>
//         <div><label>Award:</label><input type="text" name="award" required /></div>
//         <div><label>Application Deadline:</label><input type="date" name="applicationDeadline" required /></div>
//         <div><label>Official Link:</label><input type="url" name="officialLink" required /></div>
//         <div><label>Category:</label><input type="text" name="category" defaultValue="General" /></div>
//         <div><label>Image URL:</label><input type="url" name="imageUrl" defaultValue="https://placehold.co/600x400/e6f7f6/15803d?text=Scholarship" /></div>

//         <button type="submit">Create Scholarship</button>
//       </form>

//       <button type="button" onClick={() => navigate(0)}>Add More</button>
//       <button type="button" onClick={() => navigate('/')}>Go Back to Home</button>
//     </div>
//   );
// };

// export default CreateScholarship;