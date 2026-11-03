# Hilly Catchment Flash Flood Risk Pattern Segmentation Using Clustering

### A Data-Driven Analysis of Rainfall and Terrain Patterns in the Western Himalaya

An interactive analytical platform exploring geographical variations in rainfall and terrain characteristics to identify distinct regional patterns and investigate their implications for flash-flood risk assessment.

---

## 1. Overview

Flash-flood risk varies significantly across Himalayan catchments due to differences in rainfall intensity, elevation, slope, terrain relief, and geographical conditions. Applying uniform rainfall thresholds across different landscapes may fail to represent these regional variations.

This project investigates whether the Western Himalayan region can be divided into distinct rainfall and terrain zones using historical meteorological observations and geographical characteristics.

Using 11 years of historical data (2015–2025), the study applies unsupervised machine learning techniques to identify spatial patterns across 383 geographical grid cells.

The analysis combines rainfall statistics, terrain characteristics, clustering algorithms, and stability evaluation to develop a geographically differentiated segmentation framework.

The results are presented through an interactive web-based analytical platform.

## 2. Research Objectives

The primary objectives of this project are:

- Analyse spatial variations in rainfall characteristics across the Western Himalaya.
- Investigate relationships between rainfall behaviour and terrain characteristics.
- Identify meaningful geographical patterns using unsupervised machine learning.
- Evaluate different clustering algorithms and configurations.
- Examine cluster quality, consistency, and stability.
- Investigate geographically differentiated rainfall screening thresholds.
- Explore the potential application of terrain-aware segmentation in regional flash-flood risk assessment.

## 3. Study Area and Dataset

| Parameter | Description |
|---|---|
| Study Region | Western Himalaya |
| Geographic Extent | 28.5°–33.5° N, 75.5°–81° E |
| Observation Period | 2015–2025 |
| Spatial Resolution | 0.25° grid |
| Total Grid Cells | 383 |
| Hills-Only Subset | 220 grid cells |
| Rainfall Dataset | IMD Gridded Daily Rainfall |
| Terrain Dataset | SRTM v4.1 Elevation Data |

### 3.1 Rainfall Features

The rainfall dataset is analysed using the following indicators:

- Mean annual rainfall
- Wet-day rainfall percentiles (P95 and P99)
- Annual rainfall variability
- Seasonal rainfall contribution (JJAS)
- Heavy and very-heavy rainfall frequency
- Wet-day frequency
- Maximum one-day rainfall
- Maximum three-day rainfall
- Simple Daily Intensity Index (SDII)

### 3.2 Terrain Features

The geographical characteristics include:

- Mean elevation
- Minimum elevation
- Maximum elevation
- Elevation variability
- Terrain relief
- Mean slope

These features provide a combined representation of rainfall behaviour and the physical characteristics of the study region.

## 4. Methodology

The analytical workflow consists of six major stages.

### Stage 1: Data Preparation

Historical rainfall and terrain datasets are processed and aggregated across geographical grid cells.

Rainfall indicators are calculated for each grid cell, while corresponding geographical and terrain characteristics are extracted.

### Stage 2: Feature Selection and Preprocessing

The initial feature set is examined to identify redundant variables and improve the quality of the clustering input.

- Highly correlated features are evaluated using a Pearson correlation threshold of 0.85.
- Positively skewed non-negative features undergo log1p transformation.
- Retained features are standardised before clustering.
- The final feature set is used consistently across experimental configurations.

### Stage 3: Clustering

Two unsupervised clustering algorithms are evaluated.

**K-Means**

- Uses Euclidean distance.
- Groups observations around cluster centroids.
- Minimises within-cluster squared distances.

**K-Medians**

- Uses Manhattan distance.
- Represents clusters using coordinate-wise medians.
- Provides an alternative to centroid-based clustering.

Experiments examine cluster counts from k = 2 to k = 10 across both the complete geographical dataset and the hills-only subset.

### Stage 4: Model Evaluation

Different clustering configurations are compared using clustering evaluation metrics.

The evaluation considers cluster compactness, separation, and the geographical consistency of the resulting groups.

### Stage 5: Stability Analysis

Additional experiments examine whether the identified clusters remain consistent under different conditions.

The analysis includes:

- Repeated random-seed experiments.
- 80% subsampling experiments.
- Comparison across distance metrics.
- Leave-One-Feature-Out (LOFO) analysis.
- Adjusted Rand Index (ARI) comparisons.

### Stage 6: Geographical Interpretation

The resulting clusters are examined through their rainfall and terrain characteristics.

Statistical distributions, feature profiles, and dimensionality-reduction visualisations are used to interpret the geographical differences between the identified zones.

## 5. Interactive Web Application

The project includes an interactive web interface that presents the analytical workflow through a geographical exploration and modelling environment.

### Main Features

| Section | Functionality |
|---|---|
| Problem Exploration | Introduces the limitations of applying uniform rainfall thresholds across different geographical conditions. |
| Interactive Map | Displays rainfall and terrain characteristics across the study region. |
| Grid Cell Inspector | Allows individual geographical grid cells to be selected and examined. |
| Feature Analysis | Explores feature distributions, correlations, and selection decisions. |
| Clustering Laboratory | Compares clustering algorithms, geographical subsets, and cluster configurations. |
| PCA Visualisation | Provides two-dimensional and three-dimensional representations of cluster structures. |
| Stability Analysis | Examines clustering consistency across repeated experiments and feature removal. |
| Cluster Profiles | Presents statistical distributions and characteristics of individual clusters. |
| Zone-Based Solution | Displays geographical segmentation results and corresponding rainfall screening thresholds. |

### Interactive Controls

Users can explore different analytical configurations through:

- Full-region and hills-only dataset selection.
- Euclidean and Manhattan distance selection.
- Adjustable cluster counts.
- Cluster-specific filtering and highlighting.
- Feature selection and correlation exploration.
- Interactive geographical and PCA visualisations.
- Statistical summaries and analytical comparisons.

## 6. Key Findings

The analysis identifies considerable spatial variation in rainfall and terrain characteristics across the study region.

Some notable observations include:

- Wet-day P99 rainfall ranges from approximately 31.7 mm to 179.5 mm across the study grid cells.
- Mean elevation ranges from approximately 153 m to 5,654 m.
- The complete dataset contains 383 grid cells, including 220 cells in the hills-only subset.
- Rainfall extremes are not distributed uniformly across different elevation levels.

The selected full-region configuration uses K-Means with k = 4 to identify four geographical groups:

1. Low-Gradient Plains
2. Wet Himalayan Front
3. Steep High Hills
4. Cold-Arid Inner Himalaya

Each group represents a different combination of rainfall and terrain characteristics.

## 7. Zone-Based Rainfall Screening

The final analytical stage investigates an alternative to applying a single rainfall threshold across the entire study region.

For the selected full-region K-Means configuration (k = 4), the median wet-day P99 rainfall of each cluster is calculated and used as its proposed screening threshold.

This enables a comparison between:

- A single regional threshold applied to all grid cells.
- Separate cluster-level thresholds based on regional rainfall characteristics.

The comparison uses the mean absolute difference between individual grid-cell wet-day P99 values and their corresponding assigned thresholds.

The objective is to investigate whether geographical segmentation provides a more representative description of local rainfall extremes.

**Important:** These thresholds are research-derived rainfall screening values. They are not operational flood-warning thresholds and require independent hydrological validation before practical deployment.

## 8. Technology Stack

| Technology | Application |
|---|---|
| Python | Data processing and statistical analysis |
| Pandas | Data manipulation |
| NumPy | Numerical computation |
| Scikit-learn | Machine learning and clustering |
| Matplotlib | Statistical visualisation |
| HTML5 | Web application structure |
| CSS3 | Interface styling |
| JavaScript | Interactive visualisations and application logic |
| JSON | Storage of processed datasets and analytical results |

## 9. Repository Structure

```text
Hilly-Catchment-Flash-Flood-Risk-Pattern-Segmentation-Using-Clustering/
│
├── index.html
│
├── css/
│   ├── style.css
│   └── story.css
│
├── js/
│   ├── app.js
│   ├── lab.js
│   └── solution.js
│
├── data/
│   ├── cells.json
│   ├── labels.json
│   ├── metrics.json
│   ├── profiles.json
│   ├── features.json
│   ├── pca.json
│   ├── ari.json
│   ├── lofo.json
│   ├── stability.json
│   ├── summary.json
│   ├── analysis_summary.json
│   ├── final_assignments.json
│   ├── candidate_correlations.json
│   ├── selected_correlations.json
│   └── profile_heatmaps.json
│
├── README.md
└── .gitignore
