#/bin/sh

last_modified_time=$(stat -f "%m"  index.html)
while [ 1 ]; do
    modified_time=$(stat -f "%m"  index.html)

    if [ "$last_modified_time" != "$modified_time" ]; then
        echo
        echo "run at $(date) ..."
        start_time=$(date +"%s")
        #scp $(pwd)/* jangxyz:www/play/fb/.
		rsync -av --exclude=".*swp" * jangxyz:www/play/fb/.
		fin $?
        echo "done after $(($(date +"%s") - start_time)) seconds"
        last_modified_time=${modified_time}
	else
		echo -n "."
    fi

    sleep 1
done

