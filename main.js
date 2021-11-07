"use strict";

const artists = [
  {
    name: "Victor Horta",
    born: new Date(1861, 1, 6),
    died: new Date(1947, 9, 8),
    div_id: "victor-horta",
    movement: ["Art Nouveau"],
    artworks: [
      {
        title: "Stairway of the Hôtel Tassel",
        circa: false,
        began: new Date(1892, 1, 1),
        finished: new Date(1893, 1, 1),
        significance:
          "Often used as the first instance of Art Nouveau in a structure. Focus on curvy lines inspired by nature.",
        image_name: "stairway_of_hotel_tassel.jpg",
      },
    ],
  },
  {
    name: "Hector Guimard",
    born: new Date(1867, 3, 10),
    died: new Date(1942, 5, 20),
    div_id: "hector-guimard",
    movement: ["Art Nouveau"],
    artworks: [
      {
        title: "Desk",
        circa: true,
        began: new Date(1899, 1, 1),
        finished: new Date(1899, 1, 1),
        significance: "todo",
        image_name: "todo",
      },
    ],
  },
  {
    name: "Antoni Gaudí",
    born: new Date(1852, 6, 25),
    died: new Date(1926, 6, 10),
    div_id: "antoni",
    movement: ["Art Nouveau"],
    artworks: [
      {
        title: "Casa Batlló",
        circa: false,
        began: new Date(1904, 1, 1),
        finished: new Date(1907, 1, 1),
        significance: "todo",
        image_name: "todo",
      },
    ],
  },
  {
    name: "Jean (Hans) Arp",
    born: new Date(1886, 9, 16),
    died: new Date(1966, 6, 7),
    div_id: "jean-arp",
    movement: ["Dada"],
    artworks: [
      {
        title:
          "Untitled (Collage with Squares Arranged according to the Laws of Chance)",
        began: new Date(1917, 1, 1),
        finished: new Date(1917, 1, 1),
      },
    ],
  },
  {
    name: "Vladimir Tatlin",
    born: new Date(1885, 12, 28),
    died: new Date(1953, 5, 31),
    movement: ["Constructivism"],
    div_id: "vladimir-tatlin",
    artworks: [
      {
        title: "Monument to the Third International",
        circa: false,
        began: new Date(1919, 1, 1),
        finished: new Date(1920, 1, 1),
        significance: "todo",
      },
    ],
  },

  {
    name: "Hannah Höch",
    born: new Date(1889, 11, 1),
    died: new Date(1978, 5, 31),
    div_id: "hannah",
    movement: ["Dada"],
    artworks: [
      {
        title:
          "Cut with the Kitchen Knife Dada Through the Last Weimar Beer Belly Cultural Epoch of Germany",
        circa: false,
        began: new Date(1919, 1, 1),
        finished: new Date(1920, 1, 1),
        significance:
          "An early example of photo montage, a type of collage. This work takes the medium farther than Picasso by juxtaposing many disjointed images.",
        image_name: "cut_with_the_kitchen_knife.jpg",
      },
      // {
      //     title: "Beautiful Woman",
      //     circa: false,
      //     began: new Date(1920, 1, 1),
      //     finished: new Date(1920, 1, 1),
      //     significance: "todo",
      //     image_name: "beautiful_woman.jpg"
      // }
    ],
  },

  {
    name: "Piet Mondrian",
    born: new Date(1872, 3, 7),
    died: new Date(1944, 2, 1),
    div_id: "piet-mondrian",
    movement: ["De Stijl"],
    artworks: [
      {
        title: "Composition with Red, Yellow and Blue",
        began: new Date(1927, 1, 1),
        finished: new Date(1927, 1, 1),
      },
    ],
  },
];

const movements = [
  {
    name: "Art Nouveau",
    began: new Date(1883),
    declineStart: new Date(1905),
    declineEnd: new Date(1914),
  },
  {
    name: "Constructivism",
    began: new Date(1915),
    declineStart: new Date(1935),
    declineEnd: new Date(1940),
  },
  {
    name: "Dada",
    began: new Date(1915),
    declineStart: new Date(1923),
    declineEnd: new Date(1930),
  },
  {
    name: "De Stijl",
  },
];

const movementColors = [
  { r: 106, g: 9, b: 125 },
  { r: 132, g: 20, b: 45 },
  { r: 19, g: 59, b: 92 },
  { r: 83, g: 53, b: 74 },
];

let timelineStart;
let timelineEnd;
let barPadding = 20;

function getWidth() {
  return document.getElementById("p5-container").getBoundingClientRect().width;
}

function getHeight() {
  return document.getElementById("p5-container").getBoundingClientRect().height;
}

function windowResized() {
  resizeCanvas(0, 0);
  resizeCanvas(getWidth(), getHeight());
}

function setup() {
  let parent = document.getElementById("p5-container");
  let canvas = createCanvas(getWidth(), getHeight());
  canvas.parent(parent);

  timelineStart = new Date();
  timelineStart.setFullYear(1850);
  timelineEnd = new Date();
  timelineEnd.setFullYear(2000);

  for (let i = 0; i < artists.length; ++i) {
    artists[i].div = select("#" + artists[i].div_id);
    artists[i].div.addClass("artist-hidden");
  }

  for (let i = 0; i < movements.length; ++i) {
    movements[i].color = movementColors[i];
  }

  resizeCanvas(0, 0);
  resizeCanvas(getWidth(), getHeight());
}

function draw() {
  background(255);

  drawLabels();

  noStroke();
  drawArtistBars();

  fill(255, 120, 68);
  drawArtworksDots();
}

function drawLabels() {
  let yearRange = timelineEnd.getYear() - timelineStart.getYear();
  for (let i = 0; i <= yearRange; ++i) {
    let x = map(i, 0, yearRange, 0, width);
    if (i % 10 == 0) {
      stroke(0, 100);

      fill(0);
      text(i + timelineStart.getYear() + 1900, x, 10);
    } else {
      stroke(0, 20);
    }
    line(x, 0, x, height);
  }
}

function convertTimeX(a) {
  return map(
    a.getYear(),
    timelineStart.getYear(),
    timelineEnd.getYear(),
    0,
    width
  );
}

function convertTimeWidth(a, b) {
  return map(
    b.getYear() - a.getYear(),
    0,
    timelineEnd.getYear() - timelineStart.getYear(),
    0,
    width
  );
}

function getBarColor(artist) {
  return movements.find((o) => o.name === artist.movement[0]).color;
}

function mouseOver(x1, y1, width, height) {
  let x2 = x1 + width;
  let y2 = y1 + height;
  return mouseX >= x1 && mouseX <= x2 && mouseY >= y1 && mouseY <= y2;
}

function drawArtistBars() {
  let barsHeight = height - barPadding;
  let barSize = barsHeight / artists.length;
  push();
  translate(0, barPadding);
  for (let i = 0; i < artists.length; ++i) {
    push();
    let xOffset = max(0, convertTimeX(artists[i].born));
    translate(xOffset, i * barSize);

    let barColor = getBarColor(artists[i]);

    fill(barColor.r, barColor.g, barColor.b, 200);
    rect(
      0,
      0,
      convertTimeWidth(artists[i].born, artists[i].died),
      barSize - barPadding
    );

    if (
      mouseOver(
        xOffset,
        i * barSize + barPadding,
        convertTimeWidth(artists[i].born, artists[i].died),
        barSize - barPadding
      )
    ) {
      artists[i].div.removeClass("artist-hidden");
    } else {
      artists[i].div.addClass("artist-hidden");
    }

    fill(255);
    text(artists[i].name, 10, 20);
    pop();
  }
  pop();
}

function drawArtworksDots() {
  stroke(255);
  let barsHeight = height - barPadding;
  let barSize = barsHeight / artists.length;
  push();
  translate(0, barPadding);
  for (let i = 0; i < artists.length; ++i) {
    if (artists[i].artworks) {
      for (let j = 0; j < artists[i].artworks.length; ++j) {
        push();
        let xOffset = convertTimeX(artists[i].artworks[j].began);
        translate(xOffset, i * barSize);
        translate(0, barSize / 2 - 10);
        rect(
          0,
          0,
          convertTimeWidth(
            artists[i].artworks[j].began,
            artists[i].artworks[j].finished
          ) + 10,
          10,
          5
        );
        pop();
      }
    }
  }
  pop();
}
