import React from 'react';

class Photo extends React.Component {
  constructor(props) {
    super(props);

    this.i = 0;
    this.margin = 15;
    this.size = 200;
    this.width = this.size + 2 * this.margin;
    this.height = this.size * 3 + 5 * this.margin;

    this.buildSnap = this.buildSnap.bind(this);
    this.addSnap = this.addSnap.bind(this);
  }

  buildSnap() {
    this.snap = this.refs.canvas.getContext('2d');
    this.snap.fillStyle = '#fff';
    this.snap.fillRect(0,0, this.width, this.height);
  }

  addSnap() {
    const snap = this.props.snap;

    if (snap)  {
      const x = this.margin;
      const y = this.i * (this.size + this.margin) + this.margin;

      this.snap.drawImage(snap, x, y);
      this.i = this.i === 2 ? 0 : this.i + 1;
    }
  }

  componentDidMount() {
    this.buildSnap();
  }

  render() {
    this.addSnap();

    return(
      <div className="photobooth__photo">
        <canvas ref="canvas" className="photo__canvas" width={this.width} height={this.height} />
      </div>
    );
  }
}

export default Photo;