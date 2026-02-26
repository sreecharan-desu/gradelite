## GradeLite GPA Calculator: Technical Documentation

This document provides a comprehensive overview of the GradeLite GPA calculator, its architecture, workflows, and usage. It aims to equip developers with the necessary knowledge to understand, maintain, and extend the system.

### Overview

The GradeLite GPA calculator is a client-side application designed to calculate a student's GPA based on subject grades and credits. It dynamically updates the subject list based on user-selected branch, year, and semester. The application also includes a celebratory confetti effect when a GPA of 9 or higher is achieved.

### Architecture

The application's core logic resides within the `script.js` file. It interacts with HTML elements to gather user input, display subject names, and present the calculated GPA. The application utilizes JavaScript's DOM manipulation capabilities to dynamically update the user interface.

### Data Flow and Workflows

#### 1. Initialization

-   The application redirects to the `#GradeLite` anchor upon loading.
-   An array `subjects` is initialized, containing references to the HTML elements that will display subject names.
-   The HTML element with ID "10" is hidden.

#### 2. Validation Workflow

This workflow is triggered when the user submits the form with branch, year, and semester information.


**Explanation:**

1.  The user interacts with the HTML form, entering their branch, year, and semester.
2.  Upon submission, the `validate()` function in `script.js` is called.
3.  The `validate()` function first displays the `h2` and `subjects` elements, setting their opacity and transition properties for a smooth visual effect. It also makes elements with IDs 5 through 9 visible.
4.  It then constructs a header string with the provided branch, year, and semester information and updates the `h2` element's content.
5.  The function accesses the `subjectsData` object, attempting to retrieve subject information based on the user's input.
6.  If valid data is found:
    *   It iterates through the `subjects` array, updating the inner HTML of each subject element with the corresponding name from the `subjectsData`.
    *   It iterates through the `credits` array, assigning each credit value to a global variable named `subject{i+1}_credits`.
    *   It hides and shows elements based on the `hide` and `show` arrays within the data.
7.  If the input is invalid:
    *   An alert message is displayed to the user.
    *   The `h2` and `subjects` elements are hidden, and their opacity is set to 0.
    *   The application redirects to `index.html`.

#### 3. GPA Calculation Workflow

This workflow is triggered when the user clicks the "Calculate GPA" button.



**Explanation:**

1.  The user enters grades for each subject in the HTML form.
2.  Upon clicking the "Calculate GPA" button, the `calc_gpa()` function in `script.js` is called.
3.  The function initializes `Total_Credits_Obtained` and `Total_credits` to 0.
4.  It iterates through each subject (1 to 10):
    *   Retrieves the grade entered by the user for the current subject. If no grade is entered, it defaults to 0.
    *   Retrieves the credit value for the current subject from the global variable `window[`subject${i+1}\_credits`]`. If the variable is not defined, it defaults to 0.
    *   Updates `Total_Credits_Obtained` by adding the product of the grade and credit.
    *   Updates `Total_credits` by adding the credit value.
5.  The GPA is calculated by dividing `Total_Credits_Obtained` by `Total_credits`.
6.  If the calculated GPA is greater than or equal to 9:
    *   The `generateEffect()` function is called to trigger the confetti effect.
7.  The `result` and `mobile-result` HTML elements are updated with the calculated GPA.

#### 4. Confetti Effect Workflow

This workflow is triggered when the calculated GPA is greater than or equal to 9.



**Explanation:**

1.  The `generateEffect()` function is called.
2.  It sets the `duration` of the effect to 3 seconds and calculates the `end` time.
3.  An immediately invoked function expression (IIFE) named `frame` is defined and executed.
4.  Inside the `frame` function:
    *   The `confetti()` function is called twice with different configurations to create a confetti effect from the left and right sides of the screen.
    *   `requestAnimationFrame(frame)` is called to schedule the `frame` function to be executed again on the next browser repaint, creating an animation loop.
5.  The loop continues until the current time (`Date.now()`) is greater than or equal to the `end` time.

### Code Examples

#### 1. `validate()` function:

```javascript
function validate(){
    document.getElementById("h2").style.display=document.getElementById("subjects").style.display="block";
    document.getElementById("h2").style.opacity=document.getElementById("subjects").style.opacity=1;
    document.getElementById("h2").style.transition=document.getElementById("subjects").style.transition="0.4s ease-in-out";
    
    for(let i=5;i<=9;i++) document.getElementById(i).style.display="";
    
    const branch=document.getElementById("branch").value,year=document.getElementById("year").value,sem=document.getElementById("sem").value;
    document.getElementById("h2").innerHTML=` #${branch} / ${year} / ${sem}`;
    
    const subjectsData = {
        'E1': {
            'Sem - 1': {
                // Subject data
            }
        }
    };

    if(subjectsData[year] && subjectsData[year][sem] && subjectsData[year][sem][branch]) {
        const data = subjectsData[year][sem][branch];
        subjects.forEach((sub,i) => sub.innerHTML = data.names[i] ? `# ${data.names[i]}` : "");
        data.credits.forEach((cred,i) => window[`subject${i+1}_credits`] = cred);
        if(data.hide) data.hide.forEach(i => document.getElementById(i).style.display="none");
        if(data.show) data.show.forEach(i => document.getElementById(i).style.display="");
    } else {
        alert("Please Enter a Valid Input");
        document.getElementById("h2").style.display=document.getElementById("subjects").style.display="none";
        document.getElementById("h2").style.opacity=document.getElementById("subjects").style.opacity=0;
        location.href="index.html";
    }
}
```

This function retrieves user input (branch, year, semester), updates the UI, and populates subject names based on the `subjectsData` object. It also handles invalid input by displaying an alert and redirecting to the index page.

#### 2. `calc_gpa()` function:

```javascript
function calc_gpa(){
    let Total_Credits_Obtained = 0, Total_credits = 0;
    for(let i=1;i<=10;i++){
        const grade = parseFloat(document.getElementById(`subject${i}`).value) || 0;
        const credit = window[`subject${i}_credits`] || 0;
        Total_Credits_Obtained += grade * credit;
        Total_credits += credit;
    }
    const Gpa = Total_Credits_Obtained / Total_credits;
    if(Gpa>=9) generateEffect();
    document.getElementById("result").innerHTML = document.getElementById("mobile-result").innerHTML = `Your Gpa : ${Gpa}`;
}
```

This function calculates the GPA by iterating through the subject grades and credits, summing the total credits obtained and total credits, and then dividing the former by the latter. It also triggers the confetti effect if the GPA is 9 or higher and updates the UI with the calculated GPA.

#### 3. `generateEffect()` function:

```javascript
function generateEffect(){
    var duration = 3 * 1000, end = Date.now() + duration;
    (function frame(){
        confetti({particleCount:10,angle:60,spread:100,origin:{x:0}});
        confetti({particleCount:10,angle:120,spread:100,origin:{x:1}});
        if(Date.now()<end) requestAnimationFrame(frame);
    }());
}
```

This function generates a confetti effect using the `confetti` library. It sets a duration for the effect and uses `requestAnimationFrame` to create a smooth animation loop.

### Usage Guide

1.  **Include `script.js` in your HTML file.**
2.  **Define HTML elements for user input (branch, year, semester) and subject grades.**
3.  **Create HTML elements with IDs `Subject1` to `Subject10` to display subject names.**
4.  **Create HTML elements with IDs `result` and `mobile-result` to display the calculated GPA.**
5.  **Ensure the `confetti` library is included for the confetti effect.**

### Implementation Details and Gotchas

-   **Global Variables:** The `calc_gpa()` function relies on global variables (`window[`subject${i+1}_credits`]`) to store subject credits. This can lead to potential naming conflicts and makes the code harder to maintain. Consider using a more structured approach, such as storing the credits in a local variable or using a data structure.
-   **Hardcoded Subject Count:** The code assumes a fixed number of 10 subjects. This should be made configurable to support different academic programs with varying subject counts.
-   **Data Validation:** The `validate()` function performs basic data validation but could be improved to handle more edge cases and provide more informative error messages.
-   **`subjectsData` Structure:** The `subjectsData` object is hardcoded within the `validate()` function. For larger applications, consider fetching this data from an external source (e.g., a JSON file or an API) to improve maintainability and scalability.

### Common Issues and Troubleshooting

-   **Subject names not updating:** Ensure that the HTML elements with IDs `Subject1` to `Subject10` exist and are correctly referenced in the `script.js` file. Also, verify that the `subjectsData` object contains the correct subject names for the selected branch, year, and semester.
-   **GPA not calculating correctly:** Double-check that the grade input fields have the correct IDs (`subject1` to `subject10`) and that the `calc_gpa()` function is correctly parsing the input values. Also, ensure that the `subject{i+1}_credits` variables are being set correctly in the `validate()` function.
-   **Confetti effect not working:** Verify that the `confetti` library is included in the HTML file and that the `generateEffect()` function is being called when the GPA is 9 or higher.

### Advanced Configuration and Customization Options

-   **Customizing the Confetti Effect:** The `confetti()` function accepts various options to customize the confetti effect, such as particle count, angle, spread, and colors. Refer to the `confetti` library documentation for more details.
-   **Adding More Subject Data:** Extend the `subjectsData` object to include data for additional branches, years, and semesters. Consider storing this data in an external file or database for easier management.
-   **Implementing a Different Grading System:** Modify the `calc_gpa()` function to support different grading systems (e.g., letter grades) by mapping the grades to numerical values.

### Performance Considerations and Optimization Strategies

-   **Minimize DOM Manipulation:** Excessive DOM manipulation can impact performance. Consider using techniques such as batch updates and virtual DOM to reduce the number of DOM operations.
-   **Optimize Data Structures:** Choose appropriate data structures for storing and accessing subject data to improve performance.
-   **Lazy Loading:** Implement lazy loading for non-critical resources (e.g., images) to improve initial page load time.

### Security Implications and Best Practices

-   **Input Validation:** Always validate user input to prevent cross-site scripting (XSS) attacks.
-   **Data Sanitization:** Sanitize user input before displaying it on the page to prevent XSS attacks.
-   **Secure Data Storage:** If storing sensitive data (e.g., student grades) on the client-side, use appropriate encryption techniques to protect the data. However, storing sensitive data client-side is generally discouraged.
-   **HTTPS:** Ensure that the application is served over HTTPS to protect data in transit.


## Consistency & Discipline
This project is maintained regularly to ensure documentation clarity and code quality. Small, daily improvements are prioritized over large, infrequent updates.
