# adapt-scrollOnCompletion

**Scroll On Completion** is an *extension* for use with the [Adapt framework](https://github.com/adaptlearning/adapt_framework). 

The **Scroll On Completion** extension is intended to be used in association with adapt-contrib-trickle. It scrolls the page to the end of the block when the component is complete. This is useful when an interactive component is unusually tall and the Trickle button is forced out of sight (out of the viewport). In this scenario, a learner might complete interaction with a component and not realize that the Trickle button has been enabled.  

All components that complete via "inview" are excluded, since scrolling to complete them will bring into view the Trickle button. Other components may be excluded. For example, adapt-contrib-accordion completes when the final item is opened, not when the final item is closed. Automated scrolling may inconveniently move the content out of sight before it could be read.    

## Settings Overview

**Scroll On Completion** is configured with the attributes that follow. It is configured on the course level  (*course.json*). The attributes are properly formatted as JSON in [*example.json*](https://github.com/chucklorenz/adapt-scrollOnCompletion/blob/master/example.json).

### Attributes

#### *course.json*  
The following attributes, set within *course.json*, configure the defaults for **Scroll On Completion**.  

**_scrollOnCompletion** (object): The Scroll On Completion object that contains values for **_isEnabled** and **_excludeComponents**.

>**_isEnabled** (boolean): Controls whether the Scroll On Completion extension is enabled or not.

>**_excludeComponents** (string array): This value determines the components that will not be scrolled in addition to those that complete by "inview". The value must be formatted with square brackets to indicate this is an array. Multiple component names must be separated by a comma.  

<div float align=right><a href="#top">Back to Top</a></div>

## Limitations
 
none known

----------------------------
**Version number:**  0.1.0   
**Framework versions:**  2.0.18+     
**Author / maintainer:** Chuck Lorenz    
**Accessibility support:** WAI AA   
**RTL support:** yes   
