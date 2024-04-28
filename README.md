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

### Performance
![image](https://github.com/ManasMahapatra/interviews-atlan/assets/28961707/1000653f-35d6-412c-a89e-c378105730fe)
![image](https://github.com/ManasMahapatra/interviews-atlan/assets/28961707/7387f309-0fdb-44e9-853a-7207055b329b)


For this project, I am not using lighthouse performace, as on load there's no major activity going on which leads to near about perfect scores. I will be using performance analyser to profile two behaviours, searching, this includes creating the dataset and rendering the initial view, and scrolling, this will include the DOM element recylcing and virtualisation.

In the first screenshot, as you can see CPU usages spike when I start generating the 100000 data entries. However rendering them doesn't create any spike, and scripting time is also very less. This can be avoided by lowering limit for each search.

In the second screenshot, as you can see, when I start scrolling the CPU usages seem to increase. Behind the scenes if you look to the bottom highlights, you can see JS heap and Nodes start increasing. This happens during infinite scroll, as new elements are being updated, as heap size keeps increasing, however you will see a drop when garbage collection happens, do remove unnecessary data when we are past a certain part of list. This is handled by the virtualisation library, to have more control over garbage collection and DOM element recylcing, we can implement virtualisation of our own, and decide how many active nodes to keep in memory.

