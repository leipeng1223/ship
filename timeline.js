
var width_timeline = parseFloat(d3.select('#timeline').style('width').slice(0, -2));
var height_timeline = parseFloat(d3.select('#timeline').style('height').slice(0, -2));
var margin_timeline = { right: 0.1 * width_timeline, left: 0.1 * width_timeline };
var brushHeight = 0.2 * height_timeline;
var brushWidth = 0.02 * width_timeline;
var brush_extent = width_timeline - margin_timeline.right - margin_timeline.left
var brush_left = 0


// svg
const svg_timeline = d3
    .select("#timeline")
    .append("svg")
    .attr('width', width_timeline)
    .attr('height', height_timeline)

var playButton = svg_timeline
    .append("rect")
    .attr('id', 'play')
    .attr('fill', 'white')
    .attr('height', brushHeight* 1.2)
    .attr('width', brushHeight* 1.2)
    .attr('transform', `translate(${margin_timeline.left / 3 * 2},0)`)
    .on('click', () => {
        window.play = !window.play
        redraw()
    })

var progressBar = svg_timeline
    .append("rect")
    .attr('id', 'progressBar')
    .attr('height', brushHeight)
    .attr('width', brush_extent + brushWidth)
    .attr('transform', `translate(${margin_timeline.left - brushWidth / 2},0)`)

var progressRect = svg_timeline
    .append("rect")
    .attr('id', 'progressRect')
    .attr('height', brushHeight)
    .attr('width', brushWidth)
    .attr('transform', `translate(${margin_timeline.left - brushWidth / 2},0)`)
    .call(drag())

// scaleTime
var x = d3.scaleTime()
    .range([0, width_timeline - margin_timeline.right - margin_timeline.left])
    .domain([new Date(2013, 0, 0), new Date(2018, 0, 1)])

function drag() {

    function dragstarted(event, d) {
        //d3.select(this).raise().attr("stroke", "#78B6DA")
        window.play = false
        console.log('drag start')

    }

    function dragged(event, d) {
        d3.select(this).attr('transform', `translate(${event.x - brushWidth / 2},0)`)
    }

    function dragended(event, d) {
        console.log('drag end')
        //d3.select(this).attr("stroke", null);
        window.t = Math.floor((event.x - margin_timeline.left) / brush_extent * 1822)
        window.loop = t % 91
        window.play = true
    }

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
}

function redraw() {
    d3.select('#play').remove()
    if (!window.play) {
        svg_timeline
            .append("path")
            .attr('id', 'play')
            .attr("d", `M${0},${0}L${0},${brushHeight * 1.4}L${brushHeight * 1.2},${brushHeight * 0.7}`)
            .attr('fill', 'white')
            .attr('transform', `translate(${margin_timeline.left / 3 * 2},0)`)
            .on('click', () => {
                window.play = !window.play
                redraw()
            })
    }
    else {
        svg_timeline
            .append("rect")
            .attr('id', 'play')
            .attr('fill', 'white')
            .attr('height', brushHeight * 1.2)
            .attr('width', brushHeight * 1.2)
            .attr('transform', `translate(${margin_timeline.left / 3 * 2},0)`)
            .on('click', () => {
                window.play = !window.play
                redraw()
            })
    }
}

// ticks
svg_timeline.append('g')
    .attr('id', 'timeline')
    .attr("transform", `translate(${margin_timeline.left}, ${(brushHeight)})`)
    .call(d3.axisBottom(x).ticks(d3.timeYear.every(1)));