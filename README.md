# Edlepack.js

A small DOM helper library created as an experiment back in 2018. It provides a very lightweight wrapper around native DOM elements with a few utility methods for creating elements, attaching events and performing simple AJAX calls.

The original repository only contained early drafts of the code. This version cleans up some of the unfinished parts and offers a minimal but functional API.

## Usage

Include `edlepack.js` in a browser environment and use the `º` function (the `º` symbol is used similarly to `$` in jQuery) to select elements or create new ones.

```html
<script src="edlepack.js"></script>
<script>
    // create a new div inside body
    º().create({id: 'example', html: 'Hello world'});

    // change style
    º('#example').style({color: 'red'});

    // hide and show
    º('#example').hide();
    º('#example').show();

    // toggle visibility
    º('#example').toggle();

    // set or get attributes
    º('#example').attr('data-test', 'value');
    console.log(º('#example').attr('data-test'));

    // update text content
    º('#example').text('New text');

    // remove element
    º('#example').remove();
</script>
```

### Template rendering

`º(element).render(template, data)` can render small JSON based templates. See `templates.js` for examples.

### Form helpers

The library includes helpers to serialize forms to JSON and to submit them using AJAX.

```javascript
º('#myForm').ajaxSubmit(function(req){
    console.log('status', req.status);
});
```

### Additional utilities

* `attr(name, value)` - get or set attributes
* `text(value)` - get or set text content
* `toggle()` - toggle visibility
* `remove()` - remove the element from the DOM
* `append(child)` / `prepend(child)` - insert elements or HTML
* `once(event, callback)` - attach an event listener that fires once
* `today(format)` - get today's date in different formats (`mm-dd-yyyy` by default)

## Development

The project has no build step. `edlepack.min.js` is a compressed version of `edlepack.js` obtained by removing line breaks and extra spaces.

## License

MIT
