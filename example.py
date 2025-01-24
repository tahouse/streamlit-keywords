import streamlit as st
from streamlit_keywords import keywords_input


def main():
    st.title("Streamlit Keywords Demo")
    st.markdown("### Try out different keyword input configurations")

    # Example 1: Basic keyword input
    st.subheader("Basic Keyword Input")
    basic_keywords = keywords_input(
        label="Keywords", text="Add keywords and press Enter", key="basic_keyword_input"
    )
    st.write("You have entered:", basic_keywords)

    # Example 2: Keyword input with maximum limit
    st.subheader("Keyword Input with Maximum Limit")
    limited_keywords = keywords_input(
        label="Enter up to 5 keywords",
        max_keywords=5,
        text="Add up to 5 keywords",
        key="keyword_input_max5",
    )
    st.write("Keywords:", limited_keywords)

    if limited_keywords and len(limited_keywords) >= 5:
        st.warning("You have reached the maximum number of keywords.")

    # Example 3: Keyword input with default values
    st.subheader("Keyword Input with Default Values")
    initial_keywords = ["Streamlit", "Python", "Data Science"]
    preset_keywords = keywords_input(
        value=initial_keywords,
        label="Edit your keywords",
        text="These keywords are pre-populated",
        key="keyword_input_with_defaults",
    )
    st.write("Current keywords:", preset_keywords)

    # Show the state of all keyword inputs
    st.subheader("Summary")
    col1, col2, col3 = st.columns(3)

    with col1:
        st.markdown("**Basic Keywords**")
        st.write(basic_keywords)

    with col2:
        st.markdown("**Limited Keywords**")
        st.write(limited_keywords)

    with col3:
        st.markdown("**Preset Keywords**")
        st.write(preset_keywords)


if __name__ == "__main__":
    main()
