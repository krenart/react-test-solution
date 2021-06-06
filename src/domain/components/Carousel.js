import React, { Component } from "react";
import styles from "./carousel.module.css";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
    };

    this.handleNextImage = this.handleNextImage.bind(this);
    this.handlePrevImage = this.handlePrevImage.bind(this);
  }
  handleNextImage(value) {
    if (this.state.imageIndex < value - 1)
      this.setState({ imageIndex: this.state.imageIndex + 1 });
  }
  handlePrevImage() {
    if (this.state.imageIndex !== 0)
      this.setState({ imageIndex: this.state.imageIndex - 1 });
  }
  render() {
    return (
      <>
        {this.props.images.length !== 1 && this.state.imageIndex > 0 && (
          <span className={styles.leftArrow} onClick={this.handlePrevImage}>
            {`<`}
          </span>
        )}
        <img src={this.props.images[this.state.imageIndex]} />
        {this.props.images.length !== 1 &&
          this.state.imageIndex !== this.props.images.length - 1 && (
            <span
              className={styles.rightArrow}
              onClick={() => {
                this.handleNextImage(this.props.images.length);
              }}
            >{`>`}</span>
          )}
      </>
    );
  }
}

export default Layout;
