## Interview: Atlan

Walkthrough Video [Please play at highest res, for better clarity]: https://drive.google.com/file/d/11hink-G5HQ1L4T6dsQfhjMX1MZxAiykE/view?usp=sharing

### Framework Chosen

I chose to use Vite + React for this project. Vite is a fast and lightweight build tool that offers quick compilation and hot module replacement, making the development process smooth and efficient. React, on the other hand, is a popular and widely used JavaScript library for building user interfaces. I chose React for its quick setup, component-based architecture, and strong community support.

### Libraries Used
#### TanStack Table
I utilized TanStack Table to render tables in this project. TanStack Table provides fine-grained control over table rendering while remaining lightweight as it is a headless UI component. Some benefits of using TanStack Table include:

Fine-grained control over table rendering
Lightweight and efficient
Headless UI approach allows for flexibility in styling and customization

#### TanStack Virtual
TanStack Virtual was used for virtualization of data in this project. As the project needed to support large datasets, I required a solution for reusing DOM elements and implementing windowing for the table. TanStack Virtual provides efficient virtualization capabilities. Benefits of using TanStack Virtual include:

Efficient virtualization of large datasets
Reusing DOM elements for improved performance
Windowing implementation for optimized rendering

#### fakerJS
I integrated fakerJS to generate dummy data for testing purposes. While exploring options for generating dummy data, I found that using free APIs like PunkAPI or NewsAPI had limitations that could hinder testing. fakerJS is a lightweight library that allows for the creation of realistic dummy data. Some benefits of using fakerJS include:

Lightweight and easy to use
Ability to generate realistic dummy data
Flexibility in customizing data generation based on specific requirements
