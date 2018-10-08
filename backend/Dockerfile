FROM python
RUN mkdir /app
WORKDIR /app
COPY requirements.txt /app
RUN pip install -r requirements.txt
RUN pip install gunicorn
COPY backend /app/backend
COPY backend/config.prod.py /app/backend/config.py
CMD gunicorn --bind=0.0.0.0 -w 4 backend:app
