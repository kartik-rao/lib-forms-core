# lib-forms-core

Core interfaces for forms, meant to be consumed as a shared library for creating, editing and rendering a Form.

Supports multiple page, multi section, multi column forms with validation and conditional rendering.

The Form itself is represented as a JSON object can can be edited using [@kartik-rao/lib-forms](https://github.com/kartik-rao/lib-forms)

## Models
- Form
- Page
- Section
- Column
- Field

## Views
- One view for each model above
- FormHeaderView - Renders the FormHeader.
- DebugView to debug the state of the Form

## Helpers
- Validation (Field level validation)
- Conditions (For conditional rendering)