import React from 'react';

class Photo extends React.Component {
  constructor(props) {
    super(props);

    this.i = 2;
    this.yPhases = [20, -170, -330, -680];
    this.y = this.yPhases[this.i + 1];
    this.margin = 15;
    this.size = 150;
    this.width = this.size + 2 * this.margin;
    this.height = this.size * 3 + 5 * this.margin;

    this.buildSnap = this.buildSnap.bind(this);
    this.addSnap = this.addSnap.bind(this);
  }

  buildSnap() {
    if (!this.refs.canvas) {return};

    this.i = 2;
    this.y = this.yPhases[this.i + 1];
    this.snap = this.refs.canvas.getContext('2d');
    this.snap.fillStyle = '#fff';
    this.snap.fillRect(0,0, this.width, this.height * 2);
  }

  addSnap() {
    const snap = this.props.snap;

    if (snap)  {
      const x = this.margin;
      const y = this.i * (this.size + this.margin) + this.margin;

      this.snap.drawImage(snap, x, y);
      this.y = this.yPhases[this.i];
      this.i = this.i === 0 ? 2 : this.i - 1;

    } else {
      this.buildSnap();
    }
  }

  componentDidMount() {
    this.buildSnap();
  }

  render() {
    this.addSnap();

    const style = {
      transform: `translateY(${this.y}px)`
    };

    return(
      <div className="photobooth__photo-machine">
        <div className="printer printer--bottom">
          <div className="printer__outer printer__outer--bottom">
            <div className="printer__inner  printer__outer--bottom"/>
          </div>
        </div>
        <div className="photobooth__canvas-wrapper">
          <canvas ref="canvas" className="photobooth__canvas" width={this.width} height={this.height} style={style} />
        </div>
        <div className="printer printer--top">
          <div className="printer__outer printer__outer--top">
            <div className="printer__inner printer__inner--top"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Photo;