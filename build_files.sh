# Build the project
echo "Building the project..."
pip3 install -r requirements.txt

echo "Collect Static... hai"
python manage.py collectstatic