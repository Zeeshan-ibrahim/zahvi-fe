// 'use client'

// import { useEffect, useRef, useState } from "react"
// import { NavBar } from "./navbar"
// import maplibregl, { TerrainControl } from 'maplibre-gl'
// import 'maplibre-gl/dist/maplibre-gl.css'

// export const MapsLandingPage = () => {
//     const mapContainer = useRef<HTMLDivElement>(null)
//     let map = useRef<maplibregl.Map | null>(null)
//     const [isLoading, setIsLoading] = useState(true)
//     const [error, setError] = useState<string | null>(null)

//     useEffect(() => {
//         if (!mapContainer.current || map.current) return

//         // Initialize map with default view
//         map.current = new maplibregl.Map({
//             container: mapContainer.current,
//             style: 'https://api.maptiler.com/maps/streets-v4/style.json?key=JZAtljgZlvVHbBwyjIKJ',
//             center: [73.0479, 33.6844],
//             zoom: 5
//         })
//         map.current.on('load', () => {
//             const style = map.current?.getStyle();
//              console.log('STYLE SOURCES:', style);
//             // map.current?.addSource('openmaptiles', {
//             //     type: 'vector',
//             //     url: 'https://demotiles.maplibre.org/tiles/tiles.json'
//             //   });
//                 map.current?.addLayer({
//                   id: 'roads-primary',
//                   type: 'line',
//                   source: 'maplibre',
//                   'source-layer': 'transportation',
//                   filter: ['in', 'class', 'motorway', 'primary', 'secondary'],
//                   paint: {
//                     'line-color': '#ffffff',
//                     'line-width': [
//                       'interpolate',
//                       ['linear'],
//                       ['zoom'],
//                       5, 0.5,
//                       14, 4
//                     ]
//                   }
//                 });
              
              
//         })

//         // Cleanup
//         return () => {
//             if (map.current) {
//                 map.current.remove()
//                 map.current = null
//             }
//         }
//     }, [])

//     return (
//         <div className="flex flex-col h-screen">
//             <NavBar /> 
            
//             <div className="flex-1 relative">
                
//                 {error && (
//                     <div className="absolute top-4 left-4 bg-yellow-500/90 text-white px-4 py-2 rounded z-10 text-sm">
//                         {error}
//                     </div>
//                 )}
//                 <div 
//                     ref={mapContainer} 
//                     className="w-full h-full"
//                 />
//             </div>
//         </div>
//     )
// }

'use client'

import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import type {
    FeatureCollection,
    Feature,
    Point
  } from 'geojson'
import 'maplibre-gl/dist/maplibre-gl.css'

export const MapsLandingPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const [selected, setSelected] = useState<any>(null)

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    // Set RTL text plugin for Arabic and Hebrew support
    maplibregl.setRTLTextPlugin(
      'https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js',
      true
    )

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://api.maptiler.com/maps/streets-v4/style.json?key=JZAtljgZlvVHbBwyjIKJ',
      center: [73.0479, 33.6844],
      zoom: 5
    })

    mapRef.current = map

    map.on('load', () => {
      // SOURCE
      map.addSource('pictures', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
        cluster: true,
        clusterRadius: 60,
        clusterMaxZoom: 10
      })

      // CLUSTERS
      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'pictures',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': '#2563eb',
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            18, 10, 22, 50, 30
          ]
        }
      })

      // CLUSTER COUNT
      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'pictures',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-size': 12
        }
      })

      // PHOTO POINTS
      map.addLayer({
        id: 'photos',
        type: 'symbol',
        source: 'pictures',
        filter: ['!', ['has', 'point_count']],
        layout: {
          'icon-image': 'marker-15',
          'icon-size': 1
        }
      })

      setupEvents(map)
      fetchPictures(map)
    })

    return () => map.remove()
  }, [])

  // ================= EVENTS =================

  function setupEvents(map: maplibregl.Map) {
    let timeout: any

    map.on('moveend', () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => fetchPictures(map), 300)
    })

    map.on('click', 'photos', e => {
      if (!e.features?.length) return
      setSelected(e.features[0].properties)
    })

    map.on('mouseenter', 'photos', () => {
      map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseleave', 'photos', () => {
      map.getCanvas().style.cursor = ''
    })
  }

  // ================= DATA =================
// actual API
//   async function fetchPictures(map: maplibregl.Map) {
//     console.log("here", map)
//     const zoom = map.getZoom()
//     // if (zoom < 7) return

//     const b = map.getBounds()
//     const bbox = [
//       b.getWest(),
//       b.getSouth(),
//       b.getEast(),
//       b.getNorth()
//     ].join(',')

//     const res = await fetch(
//       `http://localhost:4000/api/pictures?bbox=${bbox}&zoom=${zoom}`
//     )
//     console.log("res", res)
//     const geojson = await res.json()

//     const source = map.getSource('pictures') as maplibregl.GeoJSONSource
//     source.setData(geojson)
//   }
// function generateDummyGeoJSON(
//     bbox: number[],
//     zoom: number
//   ): FeatureCollection<Point> {
//     const [minLng, minLat, maxLng, maxLat] = bbox
  
//     const count =
//       zoom < 8 ? 50 :
//       zoom < 10 ? 150 :
//       zoom < 12 ? 400 :
//       800
  
//     const features: Feature<Point>[] = Array.from({ length: count }).map((_, i) => {
//       const lng = minLng + Math.random() * (maxLng - minLng)
//       const lat = minLat + Math.random() * (maxLat - minLat)
  
//       return {
//         type: 'Feature', // ✅ literal
//         geometry: {
//           type: 'Point', // ✅ literal
//           coordinates: [lng, lat]
//         },
//         properties: {
//           id: `dummy-${zoom}-${i}`,
//           title: `Picture ${i + 1}`,
//           description: `Zoom ${zoom.toFixed(1)}`,
//           thumbnail: `https://picsum.photos/seed/${i}/80`,
//           image: `https://picsum.photos/seed/${i}/600/400`
//         }
//       }
//     })
  
//     return {
//       type: 'FeatureCollection', // ✅ literal
//       features
//     }
//   }
  
  
async function fetchPictures(map: maplibregl.Map) {
    const zoom = map.getZoom()
    if (zoom < 7) return
  
    const b = map.getBounds()
    const bbox = [
      b.getWest(),
      b.getSouth(),
      b.getEast(),
      b.getNorth()
    ]
  
    // 👇 DUMMY DATA INSTEAD OF API
    // const geojson = generateDummyGeoJSON(bbox, zoom)
  
    const source = map.getSource('pictures') as maplibregl.GeoJSONSource ;
    // source.setData(geojson) ;
  }
  

  return (
    <div className="relative h-screen w-screen">
      <div ref={mapContainer} className="h-full w-full" />

      {selected && (
        <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl z-10 p-4 overflow-auto">
          <img src={selected.image} className="rounded w-full" />
          <h2 className="mt-2 font-semibold">{selected.title}</h2>
          <p className="text-sm text-gray-600">{selected.description}</p>
        </div>
      )}
    </div>
  )
}
