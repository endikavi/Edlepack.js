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

## Development

The project has no build step. `edlepack.min.js` is a compressed version of `edlepack.js` obtained by removing line breaks and extra spaces.

## License

MIT
