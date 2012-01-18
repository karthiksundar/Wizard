Sample HTML has been added for wizard creation.

Section tags will be displayed as a wizard page and these sections should have an id in HTML.

CSS file is also provided for wizard layout. 

To display the sections as wizard pages , the code to be executed in javascript is:

$(ABC).wizard(options);

where 

ABC is the HTML selector of the parent that contains all the sections;

options indicate the optional parameters passed to the wizard. It may contain

the functions to be called while next and previous buttons are clicked and the navigation policy.

Navigation Policy can either be flexible or sequential.

flexible allows the user to navigate to next wizard page by clicking the links on the left-sided panel

whereas sequential allows the user to validate and navigate only by means of the 'Next' button.

Attached 'wizard.html' provides an example



