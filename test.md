**Input:**<Br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$N_{in}$ (the number of input vectors),<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$N_{sv}$ (the number of upport vectors),<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$N_{ft}$ (the number of features in a support vector),<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$SV[N_{sv}]$ (supportvector array),<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$IN[N_{in}]$ (input vector array),<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$b^*$ (bias)<br>
**Output:**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$F$ (decision function output)<br>
  <br>
**for** $i$ ← 1 **to** $N_{in}$ **by** 1 **do**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$F=0$<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**for** $j$ ← 1 **to** $N_{sv}$ **by** 1 **do**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$dist=0$<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**for** $k$ ← 1 **to** $N_{ft}$ **by** 1 **do**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$dist+=(SV[j].feature[k]-IN[i].feature[k])^2$<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**end**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$κ=exp(-γ×dist)$<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$F+=SV[j].α^\*×κ$ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**end**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$F=F+b^\*$<br>
**end**<br>
