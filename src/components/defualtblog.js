import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./master.css";
const ArticleDefault = () => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (toggle) {
      document.body.style.background = "#212529";
      document.body.style.color = "#f8f9fa";
    } else {
      document.body.style.background = "none";
      document.body.style.color = "inherit";
    }
  }, [toggle]);

  return (
    <>
      <div className="position-absolute" style={{ zIndex: 99, top: "50%", left: "2%" }}>
        <div id="wrapperShare">
          <button className="shareBtn" id="toggler">
            <i className="fa-solid fa-share"></i>
          </button>
          <a className="btn shareBtn fs-3" href="https://www.facebook.com/sharer/sharer.php?u=https://blogpro-sooty.vercel.app/blog/horizontal-pixel-span" id="a">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a className="btn shareBtn fs-3" href="https://www.linkedin.com/sharing/share-offsite/?url=https://blogpro-sooty.vercel.app/blog/horizontal-pixel-span" id="b">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a className="btn shareBtn fs-3" href="http://twitter.com/share?text=Horizontal Pixel Span Algorithm &url=https://blogpro-sooty.vercel.app/blog/horizontal-pixel-span" id="c">
            <i className="fa-brands fa-twitter"></i>
          </a>
        </div>
      </div>

      <label className="dbtn">
        <input
          type="checkbox"
          id="dmode"
          defaultChecked={toggle}
          onChange={(e) => {
            setToggle(!toggle);
          }}
        />
        <span className="slider boxShadow"></span>
      </label>

      <HelmetProvider>
        <Helmet>
          <title>{(document.title = useParams().title)}</title>
          <meta
            name="description"
            content="Horizontal Pixel Span alogrithm also known as Scanline Seed Fill algorithm. Non-recursive, optimal, faster, compare to Flood-Fill and Boundary-Fill algorithms. Also has advantages of both the Scanline algorithm and the seed fill algorithms."
          />
        </Helmet>
      </HelmetProvider>
      <header className="container my-5">
        <h1 className="display-3 fw-bold">
          {" "}
          Horizontal Pixel Span Algorithm <span className="d-block fw-light">using Python</span>
        </h1>
        <div className="d-flex align-middle align-items-center justify-content-between" style={{ maxWidth: "250px" }}>
          <p className="lead m-0">By Rohit</p>

          <a className="btn fs-5 rounded-pill btn-outline-info" href="https://www.facebook.com/zebcorp76/">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a className="btn fs-5 rounded-pill btn-outline-info" href="https://www.instagram.com/zeb_corp/">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a className="btn fs-5 rounded-pill btn-outline-info" href="https://www.linkedin.com/in/rohit-sharma-3341a9206/">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
        <figcaption className="blockquote-footer m-0">
          <cite title="Source Title">10/11/2022</cite>
        </figcaption>
      </header>
      <hr />
      <main className="container my-5 fs-5">
        <p className="my-3">Finally you found it!!! Congrats🥳. It was difficult. But hey, now you are here and let me guide you.</p>
        <p className="my-3">
          So, Horizontal Pixel Span alogrithm also known as Scanline Seed Fill algorithm. Non-recursive, optimal, faster, compare to Flood-Fill and Boundary-Fill algorithms. Also has advantages of
          both the Scanline algorithm and the seed fill algorithms. Now, don't get it confused by Scan Fill algorithm they may sound same but the aproaches are quite different.
        </p>
        <p className="my-4">Algorithm can be broken down in these following steps</p>
        <ul className="list-group list-group-numbered my-4 ms-5 align-center boxShadow" style={{ width: "90%" }}>
          <li className="list-group-item list-group-item-info">Pass a seed to the scanline fill algorithm. Your (x, y) coordintes.</li>
          <li className="list-group-item">Find the left endpoint of the span and push (x, y) it onto the stack.</li>
          <li className="list-group-item list-group-item-info">Loop Until Stack or array is Empty</li>
        </ul>

        <p className="my-4 mb-5">Inside the Loop, You need to follow these steps</p>
        <div className="row my-4 ms-md-5">
          <div className="col-5">
            <div className="list-group list-group-numbered" id="list-tab" role="tablist">
              <a className="list-group-item list-group-item-info list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#list-home">
                Pop off the top element on the stack.
              </a>
              <a className="list-group-item list-group-item-info list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#list-profile">
                Finding the right end of current element.
              </a>
              <a className="list-group-item list-group-item-info list-group-item-action" id="list-messages-list" data-bs-toggle="list" href="#list-messages">
                Check above and bottom for spans.
              </a>
              <a className="list-group-item list-group-item-info list-group-item-action" id="list-settings-list" data-bs-toggle="list" href="#list-settings">
                Plotting pixels and Ending Loop.
              </a>
            </div>
          </div>

          <div className="col-7 bg-dark text-light p-3 rounded boxShadow">
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                <p>
                  Now, as we write our code in python we will not pop the i.e "stack.pop(0)" at the real begining, because if we do that we need to store the value (x,y) in a temporary variable.
                  Instead of doing that we can simply pop the the element at the end of the loop.
                </p>
              </div>
              <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                <p>So, basically in here we will try to find the right most part of the current (x,y) coordinate i.e "x+1" till we hit the boundary or the boundary color.</p>
              </div>
              <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
                <p>
                  In this step we have to look for both up and down (x,y+1 and x,y-1) for any pixel spans. And push those to stack or push there left most positon to stack, which you have to do
                  anyways.
                </p>
              </div>
              <div className="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">
                <p>Finally draw or plot he pixel in the current span. End Loop</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <h4 className="display-6 mt-5">Visually it'll look something like this.</h4>
        <div className="row align-items-center">
          <div className="col-md-6 mt-0">
            <img src="../../hps.svg" className="img-fluid" />
          </div>
          <div className="col-md-6 bg-dark text-light p-4 rounded boxShadow">
            <p>
              Here <strong>S</strong> being are seed or (x,y) point will be sent to the function where we will or the function that we wrote will find the left most position of the Seed. In our case
              it'll be <strong>A</strong> and <strong>A</strong> will be pushed into to the stack. After that during our Loop we will check for both up and down pixel span and send there seed(x,y) to
              the funtion to find there left most position and push the return value to the stack
            </p>
          </div>
        </div>

        <h4 className="display-6 mt-5">Let's take a look at our code.</h4>
        <p className="text-lead fst-italic text-info">
          Here's the Link to the code file for your refrence or you don't feel like following the explanation 😇.
          <a className="btn btn-primary mx-3" href="https://github.com/zebra76966/rtl818eus">
            GitHub
          </a>
        </p>
        <p className="py-3">We are going to use following modules/packages</p>
        <ol className="list-group list-group-numbered ms-md-5 mt-2">
          <li className="list-group-item-warning list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Graphics.py</div>
              To create objects to fill.
              <button
                className="btn btn-outline-dark d-block my-2"
                onClick={(e) => {
                  navigator.clipboard.writeText(e.target.innerHTML);
                }}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Copy to clipboard"
              >
                pip install graphics.py
              </button>
            </div>
          </li>
          <li className="list-group-item-warning list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold pb-2">Python Pillow</div>
              To Fill the object.
              <button
                className="btn btn-outline-dark d-block my-2"
                onClick={(e) => {
                  navigator.clipboard.writeText(e.target.innerHTML);
                }}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Copy to clipboard"
              >
                pip install Pillow
              </button>
            </div>
          </li>
        </ol>

        <article>
          <h4 className="display-6 mt-5">1. Creating an object or Shape</h4>
          <pre className="bg-dark ms-md-5 p-2 rounded text-info my-3 boxShadow" style={{ height: "300px" }}>
            {`
              win = GraphWin("Horizontal pixel span Fill", 150, 150)
              win.setBackground("black")

              aRectangle = Rectangle(Point(5,5), Point(115,95))
              aRectangle.setOutline("blue")
              aRectangle.setFill("black")
              aPolygon = Polygon([
                                  Point(10,10), Point(50,10), Point(50,40),
                                  Point(70,40), Point(70,10), Point(110,10),
                                  Point(110,90), Point(70,90), Point(70,60),
                                  Point(50,60), Point(50,90), Point(10,90),
                                  ])
              aPolygon.setOutline("blue")
              aPolygon.setFill("black")

              aRectangle.draw(win)
              aPolygon.draw(win)

              win.postscript(file="image.eps", colormode='color')
              `}
          </pre>
          <p className="ms-md-5">
            Here we are creating an polygon similar to example image. Technically two objects one a polygon shaped as "H" which is inside an Rectangle. Also, we are saving it as an eps file so that it
            can be used by the pillow.
          </p>

          <h4 className="display-6 mt-5">2. Creating a Function to find the left most point.</h4>
          <pre className="bg-dark ms-md-5 p-2 rounded text-info my-3 boxShadow" style={{ height: "300px" }}>
            {`
              def findL(x ,y, boundary, fill):
                      coordinate=x,y
                      left=False
                      while left!=True:
                          coordinate=x,y
                          if img.getpixel(coordinate) != boundary and img.getpixel(coordinate) != fill:
                              x=x-1
                          else:
                              coordinate=x+1,y
                              left=True
                              return coordinate
              `}
          </pre>
          <p className="ms-md-5">
            Now we are sending a seed(x,y) to this function to find the left most coordinate/point and return the coordinate which then can be stored into the stack. You can see the full code at the
            link above for further reference.
          </p>

          <h4 className="display-6 mt-5">3. The Loop</h4>
          <pre className="bg-dark ms-md-5 p-2 rounded text-info my-3 boxShadow" style={{ height: "300px" }}>
            {`
              while len(stack)!=0:
                  coordinate=x,y

                  x=coordinate[0]
                  y=coordinate[1]

                  # FILLING SPANNED AREA WHILE CHECKING THE BOUNDARY AND FILL
                  if img.getpixel(coordinate) != boundary and img.getpixel(coordinate) != fill:
                      img.putpixel( (x,y), fill )

                      # CHECKING FOR UPPER SPAN AND APPENDING TO STACK THERE LEFT END =>
                      if img.getpixel((x,y+1)) != boundary and img.getpixel((x,y+1)) != fill and foundUp==0 :
                          stack.append(findL(x ,y+1, boundary, fill))
                          foundUp=1
                      else:
                          foundUp=0
                      # CHECKING FOR BOOTOM SPAN AND APPENDING TO STACK THERE LEFT END =>
                      if img.getpixel((x,y-1)) != boundary and img.getpixel((x,y-1)) != fill and foundDown==0:
                          stack.append(findL(x ,y-1, boundary, fill))
                          foundDown=1
                      else:
                          foundDown=0

                      x=x+1
                  else:
                      foundDown = foundUp =0
                      stack.pop(0)
                      # UPDATING FROM STACK
                      if len(stack)!=0:
                          coordinate=stack[0]
                          x=coordinate[0]
                          y=coordinate[1]

            `}
          </pre>
          <p className="ms-md-5">
            Final part and the most important part is the loop here we are finding the right most point while plotting the pixel and simultaneously checking for Horizontal pixel spans up(x, y-1) and
            down(x, y+1) and calling our findL funtion to find there left point and push that into our stack.
          </p>
        </article>
        <hr className="my-5" />
        <p className="py-5 text-lead text-center">
          That's it folks. I hope you found this helpful. <span className="text-danger">❤</span>
        </p>
      </main>
    </>
  );
};

export default ArticleDefault;
