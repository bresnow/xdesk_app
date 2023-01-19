import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
const Cairo = imports.cairo;
export const Clock = GObject.registerClass(
  {
    GTypeName: "Clock",
    Properties: {
      radius: GObject.ParamSpec.int(
        "radius",
        "Radius",
        "Radius of a circle",
        GObject.ParamFlags.READWRITE,
        1,
        5,
        2
      ),
      line_width: GObject.ParamSpec.int(
        "line_width",
        "lineWidth",
        "Width of a line",
        GObject.ParamFlags.READWRITE,
        0,
        1,
        0.2
      ),
    },
  },
  class extends Gtk.DrawingArea {
    radius;
    line_width;
    _init() {
      this.radius = 0.42;
      this.line_width = 0.05;
      this.draw();
    }
    draw() {
      let cxt = new Cairo.Context();
      const width = this.get_allocated_width();
      const height = this.get_allocated_height();
      cxt.scale(width, height);
      cxt.translate(0.5, 0.5);
      cxt.setLineWidth(this);
      cxt.save();
      cxt.setSourceRGBA(0.337, 0.612, 0.117, 0.9);
      cxt.paint();
      cxt.restore();
      cxt.arc(0, 0, this.radius, 0, 2 * Math.PI);
      cxt.save();
      cxt.setSourceRGBA(1, 1, 1, 0.8);
      cxt.fillPreserve();
      cxt.restore();
      cxt.strokePreserve();
      cxt.clip();
      for (let i = 0; i < 12; i++) {
        let inset = 0.05;
        cxt.save();
        cxt.setLineCap(Cairo.LineCap.ROUND);
        if (i % 3 != 0) {
          inset *= 0.8;
          cxt.setLineWidth(0.03);
        }
        cxt.moveTo(
          (this.radius - inset) * Math.cos((i * Math.PI) / 6),
          (this.radius - inset) * Math.sin((i * Math.PI) / 6)
        );
        cxt.lineTo(
          this.radius * Math.cos((i * Math.PI) / 6),
          this.radius * Math.sin((i * Math.PI) / 6)
        );
        cxt.stroke();
        cxt.restore();
      }
      let time = new Date();
      let minutes = (time.getMinutes() * Math.PI) / 30;
      let hours = (time.getHours() * Math.PI) / 6;
      let seconds = (time.getSeconds() * Math.PI) / 30;
      cxt.save();
      cxt.setLineCap(Cairo.LineCap.ROUND);
      cxt.save();
      cxt.setLineWidth(this.line_width / 3);
      cxt.setSourceRGBA(0.7, 0.7, 0.7, 0.8);
      cxt.moveTo(0, 0);
      cxt.lineTo(
        Math.sin(seconds) * (this.radius * 0.9),
        -Math.cos(seconds) * (this.radius * 0.9)
      );
      cxt.stroke();
      cxt.restore();
      cxt.setSourceRGBA(0.117, 0.337, 0.612, 0.9);
      cxt.moveTo(0, 0);
      cxt.lineTo(
        Math.sin(minutes + seconds / 60) * (this.radius * 0.8),
        -Math.cos(minutes + seconds / 60) * (this.radius * 0.8)
      );
      cxt.stroke();
      cxt.setSourceRGBA(0.337, 0.612, 0.117, 0.9);
      cxt.moveTo(0, 0);
      cxt.lineTo(
        Math.sin(hours + minutes / 12) * (this.radius * 0.5),
        -Math.cos(hours + minutes / 12) * (this.radius * 0.5)
      );
      cxt.stroke();
      cxt.restore();
      cxt.arc(0, 0, this.line_width / 3, 0, 2 * Math.PI);
      cxt.fill();
      return true;
    }
  }
);
