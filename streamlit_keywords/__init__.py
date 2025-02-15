import os
from typing import List, Optional

import streamlit.components.v1 as components


# Create a _RELEASE constant. We'll set this to False while we're developing
# the component, and True when we're ready to package and distribute it.
# (This is, of course, optional - there are innumerable ways to manage your
# release process.)
_RELEASE = True

# Declare a Streamlit component. `declare_component` returns a function
# that is used to create instances of the component. We're naming this
# function "_component_func", with an underscore prefix, because we don't want
# to expose it directly to users. Instead, we will create a custom wrapper
# function, below, that will serve as our component's public API.

# It's worth noting that this call to `declare_component` is the
# *only thing* you need to do to create the binding between Streamlit and
# your component frontend. Everything else we do in this file is simply a
# best practice.

if not _RELEASE:
    _component_func = components.declare_component(
        # We give the component a simple, descriptive name ("my_component"
        # does not fit this bill, so please choose something better for your
        # own component :)
        "streamlit_keywords",
        # Pass `url` here to tell Streamlit that the component will be served
        # by the local dev server that you run via `npm run start`.
        # (This is useful while your component is in development.)
        url="http://localhost:3001",
    )
else:
    # When we're distributing a production version of the component, we'll
    # replace the `url` param with `path`, and point it to the component's
    # build directory:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("streamlit_keywords", path=build_dir)


# Create a wrapper function for the component. This is an optional
# best practice - we could simply expose the component function returned by
# `declare_component` and call it done. The wrapper allows us to customize
# our component's API: we can pre-process its input args, post-process its
# output value, and add a docstring for users.
def keywords_input(
    value: list = [],
    label: str = "Keywords Input",
    text: str = "Type a keyword and press Enter",
    max_keywords: Optional[int] = None,
    key: Optional[str] = None,
) -> List[str]:
    """Display a Streamlit component for entering keywords.

    Args:
        value (List[str], optional): Initial list of keywords. Defaults to [].
        label (str, optional): Label for the input component. Defaults to "Keywords Input".
        text (str, optional): Instructions for the input. Defaults to "Type a keyword and press Enter".
        max_keywords (Optional[int], optional): Maximum number of keywords allowed. Defaults to None.
        key (str, optional): An optional string to use as the unique key for the widget. Defaults to None. If you do not set this key, you cannot create more than on instance of this widget. All instances must have a unique key.

    Returns:
        List[str]: A list of entered keywords.
    """
    # Call through to our private component function. Arguments we pass here
    # will be sent to the frontend, where they'll be available in an "args"
    # dictionary.

    keywords: List[str] = _component_func(
        label=label,
        text=text,
        initialValue=value,
        maxKeywords=max_keywords,
        key=key,
    )
    return keywords
