var posts=["2026/08/11/如何本地部署一个-AI/","2026/08/11/hello-world/","2026/08/11/题解：AT-kupc2024-e-Enumerate-Multiplication-Table/","2026/08/11/题解：P15022-UOI-2020-II-Stage-邻居/","2026/08/11/题解：P14970-『GTOI-2A』睡眠质量/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };