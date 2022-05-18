// Viewer
import Viewer from './Viewer/Viewer.js';

// Renderer
import AnimationRenderer from './Renderers/AnimationRenderer.js';

// Objects
import Object2D from './Objects/Object2D.js';

// Layers
import SnowLayer from './Layers/SnowLayer.js';

// Math
import Vector2 from './Math/Vector2.js';
import CanvasMath from './Math/CanvasMath.js';

// Geometrys
import Geometry from './Geometrys/Geometry.js';
import PathGeometry from './Geometrys/PathGeometry.js';

// Styles
import Style from './Styles/Style.js';

// Events
import EventCommander from './Events/EventCommander.js';

// Particles
import Particle from './Particles/Particle.js';
import SnowParticle from './Particles/SnowParticle.js';

const Tervas = {};

// Viewer
Tervas.Viewer = Viewer;

// Renderer
Tervas.AnimationRenderer = AnimationRenderer;

// Objects
Tervas.Object2D = Object2D;

// Layers
Tervas.SnowLayer = SnowLayer;

// Math
Tervas.Vector2 = Vector2;
Tervas.CanvasMath = CanvasMath;

// Geometrys
Tervas.Geometry = Geometry;
Tervas.PathGeometry = PathGeometry;

// Styles
Tervas.Style = Style;

// Events
Tervas.EventCommander = EventCommander;

// Particles
Tervas.Particle = Particle;
Tervas.SnowParticle = SnowParticle;


export default Tervas;