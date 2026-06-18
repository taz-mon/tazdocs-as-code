---
title: Oxygen DITA publishing pipeline
sidebar_label: Oxygen DITA writing project
---

# Oxygen DITA publishing pipeline

I built this repo as a job-search writing sample to demonstrate structured authoring and publishing-pipeline skills end to end. It includes:

- **DITA content design:** I structured a single project to support content creation using common files such as variables set up as `keydefs` with ditamaps in a `maps` folder and topics grouped by subjects in a separate `topics` folder.
- **Custom CSS-based PDF styling:** I built two PDF layouts, one standard and one with a three-column layout. Both use the same footer approach with `titlename` in the left, centered numbering, and the company's trademarked logo on the right. 
- **A CI/CD workflow:** I built a DITA publishing pipeline for a Lightmatter application, producing PDF output through Oxygen's DCPP (Document Conversion and Publishing Platform) and headless Oxygen Publishing Engine, automated through GitHub Actions CI/CD.


**[View the source repo](https://github.com/taz-mon/lm_taz_poc)**  

**[PDF with standard layout](https://github.com/taz-mon/lm_taz_poc/blob/main/passage_l20/passage_l20.pdf)**  

**[PDF with three-column layout](https://github.com/taz-mon/lm_taz_poc/blob/main/passage_l200/passage_l200.pdf)**