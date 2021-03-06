<h2>Help &amp; FAQs</h2>
<br>
<h3>Bug Report, Feature Requests &amp; Other Questions</h1>
<p>Kindly send in a report <a href="/bugs" target="_blank">here</a>.</p>
<br>
<h3>How private/secure is AnoChat?</h3>
<p>By forcing an HTTPS connection as well as requiring users must be joined to send/receive messages. If you see someone you didn't expect in the room, don't say anything, or ask them to leave. Since AnoChat doesn't record any personal information on the server*, they won't be able to see any of the conversation prior to joining.</p>
<br>
<h3>Why is there analytics tracking on the site?</h3>
<p>This is for statistical purposes only. Inividual rooms are not tracked directly, but are grouped together as the page "room". Check the source code for a better understanding.</p>
<br>
<h3>Can I see the source code?</h3>
<p>Sure, it's all up on <a href="https://github.com/scaryuncledevin/AnoChat.org" target="_blank">GitHub</a>.</p>
<br>
<h3>Why is there no mobile site?</h3>
<p>A design is in progress that will work well on mobile, but there is currently no ETA on that.</p>
<br>
<h3>How does AnoChat work?</h3>
<p>All rooms run in active memory using a queuing system. Once the client requests the queue for the user (which happens twice a second), their queue is purged. Once all users have left the room for good, a cleaning system shuts the room down, purging all remaining data.</p>
<br>
<h3>Why don't I need a name?</h3>
<p>Why <em>do</em> you need a name?</p>
<br>
<h3>What other features exist and can I expect?</h3>
<p>AnoChat has been a work in progress for 3 years now but doesn't have very many features.</p>
<ul>
	<li>
		<strong>Current Features:</strong>
		<ul>
			<li>No name required. Users who forego using a name will be given the name "Anonymous X", where X is the number of unnamed users who have joined.</li>
			<li>Users must be joined to send/receive messages.</li>
			<li>HTTPS connection.</li>
			<li>Easy invite system.</li>
			<li>Unique URLs that are hard to guess.</li>
		</ul>
	</li>
	<li>
		<strong>Upcoming Features:</strong>
		<ul>
			<li>Notification sounds.</li>
			<li>Mobile site/application.</li>
			<li>Room startup options:
				<ul>
					<li>Password.</li>
					<li>Name Requirements.</li>
					<li>Chat History.</li>
				</ul>
			</li>
			<li>Embeddable rooms.</li>
			<li>Ignore users.</li>
			<li>Request a feature <a href="/bugs" target="_blank">here</a>.</li>
		</ul>
	</li>
</ul>
<br>
<p style="font-size:80%">*Some chat information is recorded in the event of an error, but personal information like your name or messages are redacted. For more information, contact us or review the source code on <a href="https://github.com/scaryuncledevin/AnoChat.org" target="_blank">GitHub</a>.</p>