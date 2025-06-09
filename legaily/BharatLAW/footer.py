import streamlit as st
from htbuilder import HtmlElement, div, p, styles
from htbuilder.units import percent, px


def layout(*args):
    style = """
    <style>
      /* Make entire page background white */
      html, body, #root, .main {
          background-color: white !important;
          color: black !important;
      }

      /* Hide Streamlit default footer completely */
      footer[data-testid="stFooter"] {
          visibility: hidden !important;
          height: 0 !important;
          padding: 0 !important;
          margin: 0 !important;
          overflow: hidden !important;
          background-color: transparent !important;
      }

      /* Hide main menu */
      #MainMenu {
          visibility: hidden !important;
          height: 0 !important;
          padding: 0 !important;
          margin: 0 !important;
          overflow: hidden !important;
          background-color: transparent !important;
      }

      /* Remove blue background from header */
      header {
          background-color: white !important;
      }

      /* Main app background white */
      .stApp {
          background-color: white !important;
          bottom: 60px;
      }

      /* Custom footer styling */
      .custom-footer {
          position: fixed;
          left: 0;
          bottom: 0;
          width: 100%;
          color: #666;
          text-align: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          color: white !important;
          padding: 15px 0;
          box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
          z-index: 1000;
          font-weight: 500;
          font-size: 14px;
      }
    </style>
    """

    style_div = styles(
        position="fixed",
        left=0,
        bottom=0,
        margin=px(0, 0, 0, 0),
        width=percent(100),
        color="white",
        text_align="center",
        height="auto",
        opacity=1,
        background= '#ffffff',
        z_index="1000"
    )

    body = p()
    foot = div(
        klass="custom-footer",
        style=style_div
    )(
        body
    )

    st.markdown(style, unsafe_allow_html=True)

    for arg in args:
        if isinstance(arg, str):
            body(arg)
        elif isinstance(arg, HtmlElement):
            body(arg)

    st.markdown(str(foot), unsafe_allow_html=True)


def footer():
    myargs = [
        "© 2025 Legal AI Assistant — All rights reserved."
    ]
    layout(*myargs)


if __name__ == "__main__":
    footer()