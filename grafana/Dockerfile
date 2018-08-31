FROM grafana/grafana

USER root
ADD startGrafana.sh startGrafana.sh
RUN chmod 755 startGrafana.sh

USER grafana
ENTRYPOINT ["/startGrafana.sh"]
CMD [ "" ]


